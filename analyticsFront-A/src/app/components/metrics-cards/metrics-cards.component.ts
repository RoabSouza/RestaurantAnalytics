import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardResumo } from '../../models';

@Component({
  selector: 'app-metrics-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics-cards.component.html',
  styleUrls: ['./metrics-cards.component.scss']
})
export class MetricsCardsComponent {

  // Dados do dashboard recebidos do componente pai
  @Input() data!: DashboardResumo;

  // Formata valor para moeda brasileira
  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  // Formata números com separadores (1.000, 10.000, etc)
  formatarNumero(valor: number): string {
    return new Intl.NumberFormat('pt-BR').format(valor);
  }

  // Retorna classe CSS baseada no valor do crescimento
  getClasseCrescimento(): string {
    if (this.data.crescimentoPercentual > 0) {
      return 'crescimento-positivo';  // Verde para positivo
    } else if (this.data.crescimentoPercentual < 0) {
      return 'crescimento-negativo';  // Vermelho para negativo
    } else {
      return 'crescimento-neutro';    // Cinza para neutro
    }
  }

  // Retorna emoji baseado no crescimento
  getIconeCrescimento(): string {
    if (this.data.crescimentoPercentual > 0) {
      return '📈';  // Seta para cima
    } else if (this.data.crescimentoPercentual < 0) {
      return '📉';  // Seta para baixo
    } else {
      return '➡️';  // Seta lateral (estável)
    }
  }
}