package com.restaurant.analytics.dto;

import java.math.BigDecimal;
import java.util.List;

public class DashboardResumoDTO {
	private BigDecimal faturamentoTotal;
	private Long totalVendas;
	private BigDecimal ticketMedio;
	private BigDecimal crescimentoPercentual;
	private List<ProdutoTopDTO> topProdutos;
	private List<VendasPorCanalDTO> vendasPorCanal;
	private List<VendasPorHoraDTO> vendasPorHora;
	private List<VendasPorDiaDTO> vendasPorDia;
	private List<VendasPorLojaDTO> topLojas;
	private List<VendasPorDiaSemanaDTO> vendasPorDiaSemana;

	public DashboardResumoDTO() {
	}

	public DashboardResumoDTO(BigDecimal faturamentoTotal, Long totalVendas, BigDecimal ticketMedio,
			BigDecimal crescimentoPercentual, List<ProdutoTopDTO> topProdutos, List<VendasPorCanalDTO> vendasPorCanal,
			List<VendasPorHoraDTO> vendasPorHora, List<VendasPorDiaDTO> vendasPorDia, List<VendasPorLojaDTO> topLojas,
			List<VendasPorDiaSemanaDTO> vendasPorDiaSemana) {
		this.faturamentoTotal = faturamentoTotal;
		this.totalVendas = totalVendas;
		this.ticketMedio = ticketMedio;
		this.crescimentoPercentual = crescimentoPercentual;
		this.topProdutos = topProdutos;
		this.vendasPorCanal = vendasPorCanal;
		this.vendasPorHora = vendasPorHora;
		this.vendasPorDia = vendasPorDia;
		this.topLojas = topLojas;
		this.vendasPorDiaSemana = vendasPorDiaSemana;
	}

	public BigDecimal getFaturamentoTotal() {
		return faturamentoTotal;
	}

	public void setFaturamentoTotal(BigDecimal faturamentoTotal) {
		this.faturamentoTotal = faturamentoTotal;
	}

	public Long getTotalVendas() {
		return totalVendas;
	}

	public void setTotalVendas(Long totalVendas) {
		this.totalVendas = totalVendas;
	}

	public BigDecimal getTicketMedio() {
		return ticketMedio;
	}

	public void setTicketMedio(BigDecimal ticketMedio) {
		this.ticketMedio = ticketMedio;
	}

	public BigDecimal getCrescimentoPercentual() {
		return crescimentoPercentual;
	}

	public void setCrescimentoPercentual(BigDecimal crescimentoPercentual) {
		this.crescimentoPercentual = crescimentoPercentual;
	}

	public List<ProdutoTopDTO> getTopProdutos() {
		return topProdutos;
	}

	public void setTopProdutos(List<ProdutoTopDTO> topProdutos) {
		this.topProdutos = topProdutos;
	}

	public List<VendasPorCanalDTO> getVendasPorCanal() {
		return vendasPorCanal;
	}

	public void setVendasPorCanal(List<VendasPorCanalDTO> vendasPorCanal) {
		this.vendasPorCanal = vendasPorCanal;
	}

	public List<VendasPorHoraDTO> getVendasPorHora() {
		return vendasPorHora;
	}

	public void setVendasPorHora(List<VendasPorHoraDTO> vendasPorHora) {
		this.vendasPorHora = vendasPorHora;
	}

	public List<VendasPorDiaDTO> getVendasPorDia() {
		return vendasPorDia;
	}

	public void setVendasPorDia(List<VendasPorDiaDTO> vendasPorDia) {
		this.vendasPorDia = vendasPorDia;
	}

	public List<VendasPorLojaDTO> getTopLojas() {
		return topLojas;
	}

	public void setTopLojas(List<VendasPorLojaDTO> topLojas) {
		this.topLojas = topLojas;
	}

	public List<VendasPorDiaSemanaDTO> getVendasPorDiaSemana() {
		return vendasPorDiaSemana;
	}

	public void setVendasPorDiaSemana(List<VendasPorDiaSemanaDTO> vendasPorDiaSemana) {
		this.vendasPorDiaSemana = vendasPorDiaSemana;
	}
}