// Representa as vendas agrupadas por dia da semana
export interface VendasPorDiaSemana {
  diaSemana: number;    // Número do dia (0=domingo, 1=segunda, ..., 6=sábado)
  nomeDia: string;      // Nome completo do dia da semana
  quantidade: number;   // Total de vendas nesse dia da semana
  total: number;        // Valor total vendido nesse dia da semana
}