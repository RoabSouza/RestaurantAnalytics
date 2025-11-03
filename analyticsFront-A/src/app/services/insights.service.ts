// insights.service.ts
import { Injectable } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashboardResumo, VendasPorCanal, VendasPorHora, ProdutoTop, VendasPorLoja } from '../models';

export interface Insight {
  tipo: 'sucesso' | 'alerta' | 'info' | 'destaque';
  titulo: string;
  descricao: string;
  icone: string;
  prioridade: 'alta' | 'media' | 'baixa';
  variacao?: number;
}

export interface ComparacaoResultado {
  periodoAtual: DashboardResumo;
  periodoAnterior: DashboardResumo;
  insights: Insight[];
}

@Injectable({
  providedIn: 'root'
})
export class InsightsService {

  constructor(private dashboardService: DashboardService) { }

  async compararPeriodos(inicio: Date, fim: Date): Promise<ComparacaoResultado> {
    // Calcula período anterior equivalente
    const duracaoDias = this.calcularDuracaoDias(inicio, fim);
    const inicioAnterior = new Date(inicio);
    const fimAnterior = new Date(fim);
    
    inicioAnterior.setDate(inicio.getDate() - duracaoDias);
    fimAnterior.setDate(fim.getDate() - duracaoDias);

    // Busca dados dos dois períodos
    const [periodoAtual, periodoAnterior] = await Promise.all([
      this.dashboardService.getResumoCompleto(inicio, fim).toPromise(),
      this.dashboardService.getResumoCompleto(inicioAnterior, fimAnterior).toPromise()
    ]);

    // Gera insights comparativos
    const insights = this.gerarInsightsComparativos(periodoAtual!, periodoAnterior!);

    return {
      periodoAtual: periodoAtual!,
      periodoAnterior: periodoAnterior!,
      insights
    };
  }

  private calcularDuracaoDias(inicio: Date, fim: Date): number {
    const diffTime = Math.abs(fim.getTime() - inicio.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private gerarInsightsComparativos(atual: DashboardResumo, anterior: DashboardResumo): Insight[] {
    const insights: Insight[] = [];

    // Insight de faturamento
    const variacaoFaturamento = this.calcularVariacaoPercentual(atual.faturamentoTotal, anterior.faturamentoTotal);
    insights.push({
      tipo: variacaoFaturamento > 0 ? 'sucesso' : 'alerta',
      titulo: 'Performance de Faturamento',
      descricao: `Faturamento ${variacaoFaturamento > 0 ? 'cresceu' : 'caiu'} ${Math.abs(variacaoFaturamento).toFixed(1)}% em relação ao período anterior`,
      icone: variacaoFaturamento > 0 ? '📈' : '📉',
      prioridade: Math.abs(variacaoFaturamento) > 10 ? 'alta' : 'media',
      variacao: variacaoFaturamento
    });

    // Insight de volume de vendas
    const variacaoVendas = this.calcularVariacaoPercentual(atual.totalVendas, anterior.totalVendas);
    insights.push({
      tipo: variacaoVendas > 0 ? 'sucesso' : 'info',
      titulo: 'Volume de Vendas',
      descricao: `${atual.totalVendas.toLocaleString('pt-BR')} vendas vs ${anterior.totalVendas.toLocaleString('pt-BR')} no período anterior`,
      icone: '🛒',
      prioridade: 'media',
      variacao: variacaoVendas
    });

    // Insight de ticket médio
    const variacaoTicket = this.calcularVariacaoPercentual(atual.ticketMedio, anterior.ticketMedio);
    insights.push({
      tipo: variacaoTicket > 0 ? 'destaque' : 'alerta',
      titulo: 'Ticket Médio',
      descricao: `R$ ${atual.ticketMedio.toFixed(2)} vs R$ ${anterior.ticketMedio.toFixed(2)} no período anterior`,
      icone: '💰',
      prioridade: 'media',
      variacao: variacaoTicket
    });

    // Insight de canal principal
    const insightsCanais = this.analisarCanais(atual.vendasPorCanal, anterior.vendasPorCanal);
    insights.push(...insightsCanais);

    // Insight de produtos
    const insightsProdutos = this.analisarProdutos(atual.topProdutos, anterior.topProdutos);
    insights.push(...insightsProdutos);

    // Insight de horários
    const insightsHorarios = this.analisarHorarios(atual.vendasPorHora, anterior.vendasPorHora);
    insights.push(...insightsHorarios);

    return insights.sort((a, b) => this.calcularPrioridade(b) - this.calcularPrioridade(a));
  }

  private calcularVariacaoPercentual(atual: number, anterior: number): number {
    if (anterior === 0) return 0;
    return ((atual - anterior) / anterior) * 100;
  }

  private analisarCanais(atual: VendasPorCanal[], anterior: VendasPorCanal[]): Insight[] {
    const insights: Insight[] = [];
    
    if (!atual.length || !anterior.length) return insights;

    // Encontra canal principal em cada período
    const canalAtual = atual.reduce((prev, current) => prev.total > current.total ? prev : current);
    const canalAnterior = anterior.reduce((prev, current) => prev.total > current.total ? prev : current);

    if (canalAtual.nomeCanal !== canalAnterior.nomeCanal) {
      insights.push({
        tipo: 'info',
        titulo: 'Mudança no Canal Principal',
        descricao: `${canalAtual.nomeCanal} assumiu a liderança (era ${canalAnterior.nomeCanal})`,
        icone: '🔄',
        prioridade: 'media'
      });
    }

    // Analisa crescimento por canal
    atual.forEach(canalAtual => {
      const canalAnterior = anterior.find(c => c.nomeCanal === canalAtual.nomeCanal);
      if (canalAnterior) {
        const variacao = this.calcularVariacaoPercentual(canalAtual.total, canalAnterior.total);
        if (Math.abs(variacao) > 20) {
          insights.push({
            tipo: variacao > 0 ? 'sucesso' : 'alerta',
            titulo: `Performance do ${canalAtual.nomeCanal}`,
            descricao: `${variacao > 0 ? 'Crescimento' : 'Queda'} de ${Math.abs(variacao).toFixed(1)}%`,
            icone: variacao > 0 ? '🚀' : '⚠️',
            prioridade: 'baixa',
            variacao
          });
        }
      }
    });

    return insights;
  }

  private analisarProdutos(atual: ProdutoTop[], anterior: ProdutoTop[]): Insight[] {
    const insights: Insight[] = [];
    
    if (!atual.length || !anterior.length) return insights;

    // Produto em destaque
    const produtoAtual = atual[0];
    const produtoAnterior = anterior[0];

    if (produtoAtual.nomeProduto !== produtoAnterior.nomeProduto) {
      insights.push({
        tipo: 'destaque',
        titulo: 'Novo Produto Líder!',
        descricao: `${produtoAtual.nomeProduto} assumiu a 1ª posição`,
        icone: '🏆',
        prioridade: 'media'
      });
    }

    return insights;
  }

  private analisarHorarios(atual: VendasPorHora[], anterior: VendasPorHora[]): Insight[] {
    const insights: Insight[] = [];
    
    if (!atual.length || !anterior.length) return insights;

    // Horário de pico
    const picoAtual = atual.reduce((prev, current) => prev.quantidade > current.quantidade ? prev : current);
    const picoAnterior = anterior.reduce((prev, current) => prev.quantidade > current.quantidade ? prev : current);

    if (picoAtual.hora !== picoAnterior.hora) {
      insights.push({
        tipo: 'info',
        titulo: 'Mudança no Horário de Pico',
        descricao: `Pico agora às ${picoAtual.hora}h (era ${picoAnterior.hora}h)`,
        icone: '⏰',
        prioridade: 'baixa'
      });
    }

    return insights;
  }

  private calcularPrioridade(insight: Insight): number {
    const prioridades = { alta: 3, media: 2, baixa: 1 };
    return prioridades[insight.prioridade];
  }
}