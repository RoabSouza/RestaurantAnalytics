package com.restaurant.analytics.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.analytics.dto.DashboardResumoDTO;
import com.restaurant.analytics.dto.ProdutoTopDTO;
import com.restaurant.analytics.dto.VendasPorCanalDTO;
import com.restaurant.analytics.dto.VendasPorDiaDTO;
import com.restaurant.analytics.dto.VendasPorDiaSemanaDTO;
import com.restaurant.analytics.dto.VendasPorHoraDTO;
import com.restaurant.analytics.dto.VendasPorLojaDTO;
import com.restaurant.analytics.service.DashboardService;
import com.restaurant.analytics.service.PdfService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

	private final DashboardService dashboardService;

	private final PdfService pdfService;

	public DashboardController(DashboardService dashboardService, PdfService pdfService) {
		this.dashboardService = dashboardService;
		this.pdfService = pdfService;
	}

	
	// ENDPOINT 1: Resumo Completo do Dashboard
	@GetMapping("/resumo")
	public ResponseEntity<DashboardResumoDTO> getResumo(
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,

			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {

		if (fim == null) {
			fim = LocalDateTime.now();
		}
		if (inicio == null) {
			inicio = fim.minusDays(30);
		}

		DashboardResumoDTO resumo = dashboardService.getResumoCompleto(inicio, fim);
		return ResponseEntity.ok(resumo);

	}

	// ENDPOINT 2: Top Produtos Mais Vendidos
	@GetMapping("/produtos/top")
	public ResponseEntity<List<ProdutoTopDTO>> getTopProdutos(
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,

			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim,

			@RequestParam(defaultValue = "10") int limit) {


		if (fim == null)
			fim = LocalDateTime.now();
		if (inicio == null)
			inicio = fim.minusDays(30);

		List<ProdutoTopDTO> produtos = dashboardService.getTopProdutos(inicio, fim, limit);
		return ResponseEntity.ok(produtos);
	}

	// ENDPOINT 3: Vendas por Canal
	@GetMapping("/vendas/por-canal")
	public ResponseEntity<List<VendasPorCanalDTO>> getVendasPorCanal(
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,

			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {


		if (fim == null)
			fim = LocalDateTime.now();
		if (inicio == null)
			inicio = fim.minusDays(30);

		List<VendasPorCanalDTO> canais = dashboardService.getVendasPorCanal(inicio, fim);
		return ResponseEntity.ok(canais);
	}

	// ENDPOINT 4: Vendas por Hora do Dia
	@GetMapping("/vendas/por-hora")
	public ResponseEntity<List<VendasPorHoraDTO>> getVendasPorHora(
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,

			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {


		if (fim == null)
			fim = LocalDateTime.now();
		if (inicio == null)
			inicio = fim.minusDays(30);

		List<VendasPorHoraDTO> horas = dashboardService.getVendasPorHora(inicio, fim);
		return ResponseEntity.ok(horas);
	}

	// ENDPOINT 5: Vendas por Dia (Evolução Temporal)
	@GetMapping("/vendas/por-dia")
	public ResponseEntity<List<VendasPorDiaDTO>> getVendasPorDia(
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,

			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {


		if (fim == null)
			fim = LocalDateTime.now();
		if (inicio == null)
			inicio = fim.minusDays(30);

		List<VendasPorDiaDTO> dias = dashboardService.getVendasPorDia(inicio, fim);
		return ResponseEntity.ok(dias);
	}

	// ENDPOINT 6: Top Lojas
	@GetMapping("/lojas/top")
	public ResponseEntity<List<VendasPorLojaDTO>> getTopLojas(
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,

			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim,

			@RequestParam(defaultValue = "10") int limit) {

		if (fim == null)
			fim = LocalDateTime.now();
		if (inicio == null)
			inicio = fim.minusDays(30);

		List<VendasPorLojaDTO> lojas = dashboardService.getTopLojas(inicio, fim, limit);
		return ResponseEntity.ok(lojas);
	}

	// ENDPOINT 7: Vendas por Dia da Semana
	@GetMapping("/vendas/por-dia-semana")
	public ResponseEntity<List<VendasPorDiaSemanaDTO>> getVendasPorDiaSemana(
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,

			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {

		if (fim == null)
			fim = LocalDateTime.now();
		if (inicio == null)
			inicio = fim.minusDays(30);

		List<VendasPorDiaSemanaDTO> dias = dashboardService.getVendasPorDiaSemana(inicio, fim);
		return ResponseEntity.ok(dias);
	}

	// ENDPOINT 8: Exportar PDF
	@GetMapping("/export/pdf")
	public ResponseEntity<byte[]> exportarPdf(
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,

			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {

		try {
			if (fim == null)
				fim = LocalDateTime.now();
			if (inicio == null)
				inicio = fim.minusDays(30);

			DashboardResumoDTO dados = dashboardService.getResumoCompleto(inicio, fim);

			byte[] pdfBytes = pdfService.gerarRelatorioDashboard(dados, inicio, fim);

			String filename = String.format("dashboard_%s.pdf",
					LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")));

			// Headers
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_PDF);
			headers.setContentDispositionFormData("attachment", filename);
			headers.setContentLength(pdfBytes.length);

			return ResponseEntity.ok().headers(headers).body(pdfBytes);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}