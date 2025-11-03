import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag, CdkDropListGroup } from '@angular/cdk/drag-drop';

import { DashboardService } from '../../services';
import { DashboardResumo, VendasPorCanal } from '../../models';
import { SalesByChannelChartComponent } from '../sales-by-channel-chart/sales-by-channel-chart.component';
import { SalesByHourChartComponent } from '../sales-by-hour-chart/sales-by-hour-chart.component';
import { SalesTimelineChartComponent } from '../sales-timeline-chart/sales-timeline-chart.component';
import { TopTablesComponent } from '../top-tables/top-tables.component';
import { DateFilterComponent } from '../date-filter/date-filter.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ExportPdfModalComponent } from '../export-pdf-modal/export-pdf-modal.component';
import { InsightsPanelComponent } from '../insights-panel/insights-panel.component';

// Interface para as seções disponíveis
interface SecaoDisponivel {
  id: string;
  nome: string;
  icon: string;
  descricao: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    // ✅ CORREÇÃO: Importar módulos do CDK individualmente
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    // ✅ ADICIONAR MetricsCardsComponent que estava faltand
    SalesByChannelChartComponent,
    SalesByHourChartComponent,
    SalesTimelineChartComponent,
    DateFilterComponent,
    TopTablesComponent,
    ThemeToggleComponent,
    ExportPdfModalComponent,
    InsightsPanelComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // ========================================
  // DADOS E ESTADOS PRINCIPAIS
  // ========================================

  // Dados do dashboard
  dashboardData: DashboardResumo | null = null;

  // Estados do componente
  loading: boolean = true;
  error: string | null = null;
  modoEdicao: boolean = false;
  modoTeste: boolean = false;
  mostrarModalAdicionarSecao: boolean = false;

  // Filtros de data
  dataInicio: Date | null = null;
  dataFim: Date | null = null;

  // ========================================
  // CONFIGURAÇÃO DO DRAG & DROP
  // ========================================

  // Ordem das seções no dashboard - ✅ ADICIONAR 'insights' NA ORDEM INICIAL
  ordemSecoes: string[] = ['insights', 'metrics', 'chartsGrid', 'timeline', 'tables'];

  // Ordem dos gráficos dentro do grid
  ordemGraficos: string[] = ['pizza', 'barras'];

  // Ordem das métricas dentro da seção de métricas
  ordemMetricas: string[] = ['faturamento', 'vendas', 'ticket', 'crescimento'];

  // Seções disponíveis para adicionar
  secoesDisponiveis: SecaoDisponivel[] = [
    {
      id: 'insights',
      nome: 'Análise Comparativa',
      icon: '📊',
      descricao: 'Insights inteligentes comparando períodos'
    },
    {
      id: 'metrics',
      nome: 'Métricas Principais',
      icon: '📊',
      descricao: 'Cards com faturamento, vendas e crescimento'
    },
    {
      id: 'chartsGrid',
      nome: 'Gráficos em Grid',
      icon: '📈',
      descricao: 'Gráficos de pizza e barras lado a lado'
    },
    {
      id: 'timeline',
      nome: 'Evolução Temporal',
      icon: '📅',
      descricao: 'Gráfico de linha com histórico completo'
    },
    {
      id: 'tables',
      nome: 'Tabelas de Ranking',
      icon: '🏆',
      descricao: 'Top produtos e lojas mais vendidos'
    }
  ];

  // ========================================
  // REFERÊNCIAS E INJEÇÕES
  // ========================================

  @ViewChild(ExportPdfModalComponent) exportModal!: ExportPdfModalComponent;

  constructor(
    private dashboardService: DashboardService
  ) { }

  // ========================================
  // LIFECYCLE HOOKS
  // ========================================

  ngOnInit(): void {
    this.carregarDados();
    this.carregarLayoutSalvo();
  }

  // ========================================
  // CARREGAMENTO DE DADOS
  // ========================================

  carregarDados(): void {
    this.loading = true;
    this.error = null;
    this.modoTeste = false;

    this.dashboardService.getResumoCompleto(this.dataInicio || undefined, this.dataFim || undefined)
      .subscribe({
        next: (dados) => {
          this.dashboardData = dados;
          this.loading = false;
        },
        error: (erro) => {
          this.error = erro.message || 'Erro ao carregar dados do dashboard';
          this.loading = false;
        }
      });
  }

  // ========================================
  // SISTEMA DE DRAG & DROP
  // ========================================

  /**
   * Reordena as seções quando uma é arrastada
   */
  reordenarSecoes(event: CdkDragDrop<string[]>): void {
    if (!this.modoEdicao) return;

    moveItemInArray(this.ordemSecoes, event.previousIndex, event.currentIndex);
    this.salvarLayout();
  }

  /**
   * Reordena os gráficos dentro do grid
   */
  reordenarGraficos(event: CdkDragDrop<string[]>): void {
    if (!this.modoEdicao) return;

    moveItemInArray(this.ordemGraficos, event.previousIndex, event.currentIndex);
    this.salvarLayout();
  }

  /**
   * Reordena as métricas dentro da seção de métricas
   */
  reordenarMetricas(event: CdkDragDrop<string[]>): void {
    if (!this.modoEdicao) return;

    moveItemInArray(this.ordemMetricas, event.previousIndex, event.currentIndex);
    this.salvarLayout();
  }

  // ========================================
  // GERENCIAMENTO DE SEÇÕES
  // ========================================

  /**
   * Adiciona uma nova seção ao dashboard
   */
  adicionarSecao(idSecao: string): void {
    if (!this.ordemSecoes.includes(idSecao)) {
      this.ordemSecoes.push(idSecao);
      this.salvarLayout();
      this.fecharModalSecoes();
    }
  }

  /**
   * Remove uma seção do dashboard
   */
  removerSecao(idSecao: string): void {
    if (!this.modoEdicao) return;

    const index = this.ordemSecoes.indexOf(idSecao);
    if (index > -1) {
      this.ordemSecoes.splice(index, 1);
      this.salvarLayout();
    }
  }

  /**
   * Verifica se uma seção está visível
   */
  isSecaoVisivel(idSecao: string): boolean {
    return this.ordemSecoes.includes(idSecao);
  }

  // ========================================
  // MODAIS E CONTROLES DE INTERFACE
  // ========================================

  /**
   * Alterna entre modo de edição e visualização
   */
  toggleModoEdicao(): void {
    this.modoEdicao = !this.modoEdicao;

    if (!this.modoEdicao) {
      this.salvarLayout();
    }
  }

  /**
   * Abre o modal para adicionar seções
   */
  mostrarModalSecoes(): void {
    if (!this.modoEdicao) return;
    this.mostrarModalAdicionarSecao = true;
  }

  /**
   * Fecha o modal de adição de seções
   */
  fecharModalSecoes(): void {
    this.mostrarModalAdicionarSecao = false;
  }

  // ========================================
  // PERSISTÊNCIA DO LAYOUT
  // ========================================

  /**
   * Salva o layout atual no localStorage
   */
  private salvarLayout(): void {
    const layout = {
      ordemSecoes: this.ordemSecoes,
      ordemGraficos: this.ordemGraficos,
      ordemMetricas: this.ordemMetricas,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('dashboard-layout', JSON.stringify(layout));
  }

  /**
   * Carrega o layout salvo do localStorage
   */
  private carregarLayoutSalvo(): void {
    const layoutSalvo = localStorage.getItem('dashboard-layout');

    if (layoutSalvo) {
      try {
        const layout = JSON.parse(layoutSalvo);

        if (layout.ordemSecoes && Array.isArray(layout.ordemSecoes)) {
          this.ordemSecoes = layout.ordemSecoes;
        }

        if (layout.ordemGraficos && Array.isArray(layout.ordemGraficos)) {
          this.ordemGraficos = layout.ordemGraficos;
        }

        if (layout.ordemMetricas && Array.isArray(layout.ordemMetricas)) {
          this.ordemMetricas = layout.ordemMetricas;
        }
      } catch (error) {
        console.error('Erro ao carregar layout:', error);
      }
    }
  }

  // ========================================
  // MÉTODOS DE TESTE E SIMULAÇÃO
  // ========================================

  /**
   * Simula mudança de dados para testar reatividade
   */
  simularMudancaDeDados(): void {
    if (!this.dashboardData) return;

    this.modoTeste = true;

    const novosCanais: VendasPorCanal[] = [
      {
        nomeCanal: '🔥 TESTE - Canal A',
        tipoCanal: 'D',
        total: 99999,
        quantidade: 500,
        ticketMedio: 200
      },
      {
        nomeCanal: '🔥 TESTE - Canal B',
        tipoCanal: 'P',
        total: 88888,
        quantidade: 400,
        ticketMedio: 222
      }
    ];

    this.dashboardData = {
      ...this.dashboardData,
      vendasPorCanal: novosCanais,
      faturamentoTotal: 999999,
      crescimentoPercentual: 25.5
    };
  }

  /**
   * Adiciona um canal aleatório para teste
   */
  adicionarCanalAleatorio(): void {
    if (!this.dashboardData || !this.dashboardData.vendasPorCanal) return;

    const novoCanal: VendasPorCanal = {
      nomeCanal: `Canal Teste ${Math.floor(Math.random() * 1000)}`,
      tipoCanal: 'D',
      total: Math.floor(Math.random() * 50000) + 1000,
      quantidade: Math.floor(Math.random() * 200) + 10,
      ticketMedio: Math.floor(Math.random() * 150) + 50
    };

    this.dashboardData.vendasPorCanal = [
      ...this.dashboardData.vendasPorCanal,
      novoCanal
    ];
  }

  // ========================================
  // MÉTODOS DE FORMATAÇÃO
  // ========================================

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  formatarNumero(valor: number): string {
    return new Intl.NumberFormat('pt-BR').format(valor);
  }

  getClasseCrescimento(): string {
    if (!this.dashboardData) return '';

    if (this.dashboardData.crescimentoPercentual > 0) {
      return 'crescimento-positivo';
    } else if (this.dashboardData.crescimentoPercentual < 0) {
      return 'crescimento-negativo';
    } else {
      return 'crescimento-neutro';
    }
  }

  getIconeCrescimento(): string {
    if (!this.dashboardData) return '➡️';

    if (this.dashboardData.crescimentoPercentual > 0) {
      return '📈';
    } else if (this.dashboardData.crescimentoPercentual < 0) {
      return '📉';
    } else {
      return '➡️';
    }
  }

  // ========================================
  // MÉTODOS EXISTENTES
  // ========================================

  aplicarFiltros(evento: { inicio: Date, fim: Date }): void {
    this.dataInicio = evento.inicio;
    this.dataFim = evento.fim;
    this.carregarDados();
  }

  abrirModalExport(): void {
    this.exportModal.open();
  }

  recarregar(): void {
    this.carregarDados();
  }
}