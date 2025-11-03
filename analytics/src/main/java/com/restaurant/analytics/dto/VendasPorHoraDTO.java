package com.restaurant.analytics.dto;

import java.math.BigDecimal;

public class VendasPorHoraDTO {
	private Integer hora;
	private Long quantidade;
	private BigDecimal total;

	public VendasPorHoraDTO() {
	}

	public VendasPorHoraDTO(Integer hora, Long quantidade, BigDecimal total) {
		this.hora = hora;
		this.quantidade = quantidade;
		this.total = total;
	}

	public Integer getHora() {
		return hora;
	}

	public void setHora(Integer hora) {
		this.hora = hora;
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
}