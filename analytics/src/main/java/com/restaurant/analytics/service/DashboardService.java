package com.restaurant.analytics.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.restaurant.analytics.dto.DashboardResumoDTO;
import com.restaurant.analytics.dto.ProdutoTopDTO;
import com.restaurant.analytics.dto.VendasPorCanalDTO;
import com.restaurant.analytics.dto.VendasPorDiaDTO;
import com.restaurant.analytics.dto.VendasPorDiaSemanaDTO;
import com.restaurant.analytics.dto.VendasPorHoraDTO;
import com.restaurant.analytics.dto.VendasPorLojaDTO;
import com.restaurant.analytics.repository.SaleRepository;

@Service
public class DashboardService {

	private final SaleRepository saleRepository;

	public DashboardService(SaleRepository saleRepository) {
		this.saleRepository = saleRepository;
	}

	public DashboardResumoDTO getResumoCompleto(LocalDateTime inicio, LocalDateTime fim) {
		long dias = java.time.Duration.between(inicio, fim).toDays();
		LocalDateTime inicioAnterior = inicio.minusDays(dias);
		LocalDateTime fimAnterior = inicio.minusSeconds(1);

		BigDecimal totalAtual = saleRepository.sumTotalByPeriodo(inicio, fim);
		Long quantidadeAtual = saleRepository.countByPeriodo(inicio, fim);
		BigDecimal totalAnterior = saleRepository.sumTotalByPeriodo(inicioAnterior, fimAnterior);

		BigDecimal ticketMedio = quantidadeAtual > 0
				? totalAtual.divide(BigDecimal.valueOf(quantidadeAtual), 2, RoundingMode.HALF_UP)
				: BigDecimal.ZERO;

		BigDecimal crescimento = BigDecimal.ZERO;
		if (totalAnterior.compareTo(BigDecimal.ZERO) > 0) {
			crescimento = totalAtual.subtract(totalAnterior).divide(totalAnterior, 4, RoundingMode.HALF_UP)
					.multiply(BigDecimal.valueOf(100));
		}

		List<ProdutoTopDTO> topProdutos = getTopProdutos(inicio, fim, 10);
		List<VendasPorCanalDTO> vendasPorCanal = getVendasPorCanal(inicio, fim);
		List<VendasPorHoraDTO> vendasPorHora = getVendasPorHora(inicio, fim);
		List<VendasPorDiaDTO> vendasPorDia = getVendasPorDia(inicio, fim);
		List<VendasPorLojaDTO> topLojas = getTopLojas(inicio, fim, 10);
		List<VendasPorDiaSemanaDTO> vendasPorDiaSemana = getVendasPorDiaSemana(inicio, fim);

		return new DashboardResumoDTO(totalAtual, quantidadeAtual, ticketMedio, crescimento, topProdutos,
				vendasPorCanal, vendasPorHora, vendasPorDia, topLojas, vendasPorDiaSemana);
	}

	public List<ProdutoTopDTO> getTopProdutos(LocalDateTime inicio, LocalDateTime fim, int limit) {
		List<Object[]> results = saleRepository.findTopProdutos(inicio, fim, limit);
		List<ProdutoTopDTO> produtos = new ArrayList<>();

		for (Object[] row : results) {
			produtos.add(new ProdutoTopDTO(((Number) row[0]).longValue(), (String) row[1],
					((Number) row[2]).longValue(), ((Number) row[3]).doubleValue()));
		}

		return produtos;
	}

	public List<VendasPorCanalDTO> getVendasPorCanal(LocalDateTime inicio, LocalDateTime fim) {
		List<Object[]> results = saleRepository.findVendasPorCanal(inicio, fim);
		List<VendasPorCanalDTO> canais = new ArrayList<>();

		for (Object[] row : results) {
			
			String tipoCanal = row[1] != null ? row[1].toString() : null;

			canais.add(new VendasPorCanalDTO((String) row[0], 
					tipoCanal, 
					((Number) row[2]).longValue(), 
					new BigDecimal(row[3].toString()),
					new BigDecimal(row[4].toString()) 
			));
		}

		return canais;
	}

	public List<VendasPorHoraDTO> getVendasPorHora(LocalDateTime inicio, LocalDateTime fim) {
		List<Object[]> results = saleRepository.findVendasPorHora(inicio, fim);
		List<VendasPorHoraDTO> horas = new ArrayList<>();

		for (Object[] row : results) {
			horas.add(new VendasPorHoraDTO(((Number) row[0]).intValue(), ((Number) row[1]).longValue(),
					new BigDecimal(row[2].toString())));
		}

		return horas;
	}

	public List<VendasPorDiaDTO> getVendasPorDia(LocalDateTime inicio, LocalDateTime fim) {
		List<Object[]> results = saleRepository.findVendasPorDia(inicio, fim);
		List<VendasPorDiaDTO> dias = new ArrayList<>();

		for (Object[] row : results) {
			LocalDate data = row[0] instanceof java.sql.Date ? ((java.sql.Date) row[0]).toLocalDate()
					: (LocalDate) row[0];

			dias.add(new VendasPorDiaDTO(data, ((Number) row[1]).longValue(), new BigDecimal(row[2].toString())));
		}

		return dias;
	}

	public List<VendasPorLojaDTO> getTopLojas(LocalDateTime inicio, LocalDateTime fim, int limit) {
		List<Object[]> results = saleRepository.findTopLojas(inicio, fim, limit);
		List<VendasPorLojaDTO> lojas = new ArrayList<>();

		for (Object[] row : results) {
			lojas.add(new VendasPorLojaDTO(((Number) row[0]).longValue(), (String) row[1], (String) row[2],
					(String) row[3], ((Number) row[4]).longValue(), new BigDecimal(row[5].toString()),
					new BigDecimal(row[6].toString())));
		}

		return lojas;
	}

	public List<VendasPorDiaSemanaDTO> getVendasPorDiaSemana(LocalDateTime inicio, LocalDateTime fim) {
		List<Object[]> results = saleRepository.findVendasPorDiaSemana(inicio, fim);
		List<VendasPorDiaSemanaDTO> dias = new ArrayList<>();

		String[] nomesDias = { "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado" };

		for (Object[] row : results) {
			int diaSemana = ((Number) row[0]).intValue();

			dias.add(new VendasPorDiaSemanaDTO(diaSemana, nomesDias[diaSemana], ((Number) row[1]).longValue(),
					new BigDecimal(row[2].toString())));
		}

		return dias;
	}

}