// Representa as vendas agrupadas por hora do dia
export interface VendasPorHora {
  hora: number;         // Hora do dia (0 a 23)
  quantidade: number;   // Total de vendas nessa hora
  total: number;        // Valor total vendido nessa hora
}