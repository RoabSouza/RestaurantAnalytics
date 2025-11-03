package com.restaurant.analytics.dto;

public class ProdutoTopDTO {
	private Long produtoId;
	private String nomeProduto;
	private Long quantidadeVendida;
	private Double totalVendido;

	public ProdutoTopDTO() {
	}

	public ProdutoTopDTO(Long produtoId, String nomeProduto, Long quantidadeVendida, Double totalVendido) {
		this.produtoId = produtoId;
		this.nomeProduto = nomeProduto;
		this.quantidadeVendida = quantidadeVendida;
		this.totalVendido = totalVendido;
	}

	public Long getProdutoId() {
		return produtoId;
	}

	public void setProdutoId(Long produtoId) {
		this.produtoId = produtoId;
	}

	public String getNomeProduto() {
		return nomeProduto;
	}

	public void setNomeProduto(String nomeProduto) {
		this.nomeProduto = nomeProduto;
	}

	public Long getQuantidadeVendida() {
		return quantidadeVendida;
	}

	public void setQuantidadeVendida(Long quantidadeVendida) {
		this.quantidadeVendida = quantidadeVendida;
	}

	public Double getTotalVendido() {
		return totalVendido;
	}

	public void setTotalVendido(Double totalVendido) {
		this.totalVendido = totalVendido;
	}
}