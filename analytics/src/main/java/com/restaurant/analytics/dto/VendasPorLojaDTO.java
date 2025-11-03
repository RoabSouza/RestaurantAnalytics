package com.restaurant.analytics.dto;

import java.math.BigDecimal;

public class VendasPorLojaDTO {
	private Long lojaId;
	private String nomeLoja;
	private String cidade;
	private String estado;
	private Long quantidade;
	private BigDecimal total;
	private BigDecimal ticketMedio;

	public VendasPorLojaDTO() {
	}

	public VendasPorLojaDTO(Long lojaId, String nomeLoja, String cidade, String estado, Long quantidade,
			BigDecimal total, BigDecimal ticketMedio) {
		this.lojaId = lojaId;
		this.nomeLoja = nomeLoja;
		this.cidade = cidade;
		this.estado = estado;
		this.quantidade = quantidade;
		this.total = total;
		this.ticketMedio = ticketMedio;
	}

	public Long getLojaId() {
		return lojaId;
	}

	public void setLojaId(Long lojaId) {
		this.lojaId = lojaId;
	}

	public String getNomeLoja() {
		return nomeLoja;
	}

	public void setNomeLoja(String nomeLoja) {
		this.nomeLoja = nomeLoja;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Long getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Long quantidade) {
		this.quantidade = quantidade;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public BigDecimal getTicketMedio() {
		return ticketMedio;
	}

	public void setTicketMedio(BigDecimal ticketMedio) {
		this.ticketMedio = ticketMedio;
	}
}