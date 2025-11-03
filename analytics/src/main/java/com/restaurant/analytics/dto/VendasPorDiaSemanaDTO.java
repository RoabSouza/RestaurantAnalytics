package com.restaurant.analytics.dto;

import java.math.BigDecimal;

public class VendasPorDiaSemanaDTO {
	private Integer diaSemana;
	private String nomeDia;
	private Long quantidade;
	private BigDecimal total;

	
	public VendasPorDiaSemanaDTO() {
	}

	public VendasPorDiaSemanaDTO(Integer diaSemana, String nomeDia, Long quantidade, BigDecimal total) {
		this.diaSemana = diaSemana;
		this.nomeDia = nomeDia;
		this.quantidade = quantidade;
		this.total = total;
	}

	public Integer getDiaSemana() {
		return diaSemana;
	}

	public void setDiaSemana(Integer diaSemana) {
		this.diaSemana = diaSemana;
	}

	public String getNomeDia() {
		return nomeDia;
	}

	public void setNomeDia(String nomeDia) {
		this.nomeDia = nomeDia;
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