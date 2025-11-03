// Representa um produto no ranking dos mais vendidos
export interface ProdutoTop {
  produtoId: number;          // Código único do produto
  nomeProduto: string;        // Nome completo do produto
  quantidadeVendida: number;  // Quantidade total vendida
  totalVendido: number;       // Valor total gerado por este produto
}