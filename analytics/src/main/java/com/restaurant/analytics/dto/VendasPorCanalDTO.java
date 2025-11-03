package com.restaurant.analytics.dto;

import java.math.BigDecimal;

public class VendasPorCanalDTO {
	private String nomeCanal;
	private String tipoCanal;
	private Long quantidade;
	private BigDecimal total;
	private BigDecimal ticketMedio;

	
	public VendasPorCanalDTO() {
	}

	public VendasPorCanalDTO(String nomeCanal, String tipoCanal, Long quantidade, BigDecimal total,
			BigDecimal ticketMedio) {
		this.nomeCanal = nomeCanal;
		this.tipoCanal = tipoCanal;
		this.quantidade = quantidade;
		this.total = total;
		this.ticketMedio = ticketMedio;
	}

	public String getNomeCanal() {
		return nomeCanal;
	}

	public void setNomeCanal(String nomeCanal) {
		this.nomeCanal = nomeCanal;
	}

	public String getTipoCanal() {
		return tipoCanal;
	}

	public void setTipoCanal(String tipoCanal) {
		this.tipoCanal = tipoCanal;
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