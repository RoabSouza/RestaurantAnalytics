// Representa as vendas de um dia específico para análise temporal
export interface VendasPorDia {
  data: string;         // Data no formato YYYY-MM-DD
  quantidade: number;   // Total de vendas nesse dia
  total: number;        // Valor total vendido nesse dia
}