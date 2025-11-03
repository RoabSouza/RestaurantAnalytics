import { ProdutoTop } from './produto-top.model';
import { VendasPorCanal } from './vendas-por-canal.model';
import { VendasPorHora } from './vendas-por-hora.model';
import { VendasPorDia } from './vendas-por-dia.model';
import { VendasPorLoja } from './vendas-por-loja.model';
import { VendasPorDiaSemana } from './vendas-por-dia-semana.model';

// Interface principal que contém todos os dados do dashboard
export interface DashboardResumo {
    // Métricas principais
    faturamentoTotal: number;          // Valor total faturado no período
    totalVendas: number;               // Quantidade total de vendas
    ticketMedio: number;               // Valor médio por venda
    crescimentoPercentual: number;     // Percentual de crescimento

    // Dados detalhados para análises
    topProdutos: ProdutoTop[];                  // Produtos mais vendidos
    vendasPorCanal: VendasPorCanal[];          // Vendas por canal
    vendasPorHora: VendasPorHora[];            // Vendas por hora do dia
    vendasPorDia: VendasPorDia[];              // Evolução diária
    topLojas: VendasPorLoja[];                 // Ranking de lojas
    vendasPorDiaSemana: VendasPorDiaSemana[];  // Vendas por dia da semana
}