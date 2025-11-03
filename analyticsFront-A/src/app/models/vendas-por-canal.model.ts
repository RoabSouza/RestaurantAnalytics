// Representa as vendas agrupadas por canal de venda
export interface VendasPorCanal {
    nomeCanal: string;       // Nome do canal (iFood, Balcão, Site, etc.)
    tipoCanal: string;       // Tipo: P = Presencial, D = Delivery
    quantidade: number;      // Total de vendas por este canal
    total: number;           // Valor total vendido por este canal
    ticketMedio: number;     // Valor médio por venda neste canal
}