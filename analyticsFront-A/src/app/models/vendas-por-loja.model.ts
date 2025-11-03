// Representa os dados de vendas de uma loja específica
export interface VendasPorLoja {
  lojaId: number;          // Identificador único da loja
  nomeLoja: string;        // Nome completo da loja
  cidade: string;          // Cidade onde a loja está localizada
  estado: string;          // Estado (sigla de 2 letras)
  quantidade: number;      // Número total de vendas
  total: number;           // Valor total faturado
  ticketMedio: number;     // Valor médio por venda nesta loja
}