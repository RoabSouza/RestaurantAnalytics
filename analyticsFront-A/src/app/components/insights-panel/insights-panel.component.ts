// insights-panel.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightsService, Insight, ComparacaoResultado } from '../../services/insights.service';
import { DashboardResumo } from '../../models';

@Component({
  selector: 'app-insights-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="insights-panel">
      <div class="insights-header">
        <h3>📊 Análise Comparativa</h3>
        <button *ngIf="carregando" class="btn-loading" disabled>
          ⏳ Analisando...
        </button>
      </div>

      <div *ngIf="carregando" class="loading-insights">
        <div class="spinner"></div>
        <p>Comparando períodos...</p>
      </div>

      <div *ngIf="!carregando && resultado" class="insights-content">
        <div class="periodo-info">
          <small>Comparando com período anterior equivalente</small>
        </div>

        <!-- Container com scroll condicional -->
        <div class="insights-container" [class.scrollable]="temMuitosInsights()">
          <div *ngFor="let insight of resultado.insights" 
               class="insight-item" 
               [class]="'insight-' + insight.tipo">
            
            <div class="insight-header">
              <span class="insight-icon">{{ insight.icone }}</span>
              <strong class="insight-title">{{ insight.titulo }}</strong>
              <span class="insight-priority" [class]="'priority-' + insight.prioridade">
                {{ insight.prioridade }}
              </span>
            </div>
            
            <p class="insight-description">{{ insight.descricao }}</p>
            
            <div *ngIf="insight.variacao !== undefined" class="insight-variacao">
              <span [class]="insight.variacao > 0 ? 'positive' : 'negative'">
                {{ insight.variacao > 0 ? '+' : '' }}{{ insight.variacao.toFixed(1) }}%
              </span>
            </div>
          </div>
        </div>

        <!-- Indicador de scroll (aparece apenas quando há muitos insights) -->
        <div *ngIf="temMuitosInsights()" class="scroll-indicator">
          <span>⬇️ Role para ver mais insights</span>
        </div>

        <div *ngIf="!resultado.insights.length" class="no-insights">
          <p>📈 Aplique filtros para ver análises comparativas</p>
        </div>
      </div>

      <div *ngIf="erro" class="error-insights">
        <p>⚠️ {{ erro }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./insights-panel.component.scss']
})
export class InsightsPanelComponent implements OnChanges {
  @Input() dadosAtuais!: DashboardResumo;
  @Input() dataInicio!: Date | null;
  @Input() dataFim!: Date | null;

  resultado: ComparacaoResultado | null = null;
  carregando: boolean = false;
  erro: string | null = null;

  constructor(private insightsService: InsightsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // Quando as datas mudam, gera nova comparação
    if ((changes['dataInicio'] || changes['dataFim']) && this.dataInicio && this.dataFim) {
      this.gerarInsightsComparativos();
    }
  }

  // Verifica se há mais de 3 insights para ativar o scroll
  temMuitosInsights(): boolean {
    if (!this.resultado || !this.resultado.insights) {
      return false;
    }
    return this.resultado.insights.length > 3;
  }

  private async gerarInsightsComparativos(): Promise<void> {
    if (!this.dataInicio || !this.dataFim) return;

    this.carregando = true;
    this.erro = null;

    try {
      this.resultado = await this.insightsService.compararPeriodos(this.dataInicio, this.dataFim);
    } catch (error) {
      this.erro = 'Erro ao gerar análise comparativa';
      console.error('Erro nos insights:', error);
    } finally {
      this.carregando = false;
    }
  }
}