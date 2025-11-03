package com.restaurant.analytics.service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;
import com.restaurant.analytics.dto.DashboardResumoDTO;
import com.restaurant.analytics.dto.ProdutoTopDTO;
import com.restaurant.analytics.dto.VendasPorCanalDTO;
import com.restaurant.analytics.dto.VendasPorLojaDTO;

@Service
public class PdfService {

	private static final Font TITLE_FONT = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, BaseColor.BLACK);
	private static final Font SUBTITLE_FONT = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.DARK_GRAY);
	private static final Font NORMAL_FONT = new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);
	private static final Font HEADER_FONT = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.WHITE);

	// MÉTODO: Gerar PDF do Dashboard
	public byte[] gerarRelatorioDashboard(DashboardResumoDTO dados, LocalDateTime inicio, LocalDateTime fim)
			throws Exception {

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		Document document = new Document(PageSize.A4);

		try {
			PdfWriter.getInstance(document, baos);
			document.open();

			adicionarCabecalho(document, inicio, fim);
			adicionarMetricasPrincipais(document, dados);
			adicionarTabelaProdutos(document, dados.getTopProdutos());
			adicionarTabelaLojas(document, dados.getTopLojas());
			adicionarVendasPorCanal(document, dados.getVendasPorCanal());
			adicionarRodape(document);

			document.close();

		} catch (Exception e) {
			throw new Exception("Erro ao gerar PDF: " + e.getMessage(), e);
		}

		return baos.toByteArray();
	}

	// MÉTODO: Adicionar Cabeçalho
	private void adicionarCabecalho(Document document, LocalDateTime inicio, LocalDateTime fim)
			throws DocumentException {

		Paragraph title = new Paragraph("Relatório Dashboard Restaurante", TITLE_FONT);
		title.setAlignment(Element.ALIGN_CENTER);
		title.setSpacingAfter(10);
		document.add(title);

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
		String periodo = String.format("Período: %s até %s", inicio.format(formatter), fim.format(formatter));

		Paragraph periodoParagraph = new Paragraph(periodo, SUBTITLE_FONT);
		periodoParagraph.setAlignment(Element.ALIGN_CENTER);
		periodoParagraph.setSpacingAfter(20);
		document.add(periodoParagraph);

		document.add(new LineSeparator());
		document.add(Chunk.NEWLINE);
	}

	// MÉTODO: Adicionar Métricas Principais
	private void adicionarMetricasPrincipais(Document document, DashboardResumoDTO dados) throws DocumentException {

		Paragraph subtitle = new Paragraph("Métricas Principais", SUBTITLE_FONT);
		subtitle.setSpacingAfter(10);
		document.add(subtitle);

		PdfPTable table = new PdfPTable(2);
		table.setWidthPercentage(100);
		table.setSpacingAfter(20);

		BaseColor headerColor = new BaseColor(102, 126, 234);

		adicionarCelulaMetrica(table, "Faturamento Total", String.format("R$ %,.2f", dados.getFaturamentoTotal()),
				headerColor);

		adicionarCelulaMetrica(table, "Total de Vendas", String.format("%,d", dados.getTotalVendas()), headerColor);

		adicionarCelulaMetrica(table, "Ticket Médio", String.format("R$ %,.2f", dados.getTicketMedio()), headerColor);

		String crescimento = String.format("%+.2f%%", dados.getCrescimentoPercentual());
		adicionarCelulaMetrica(table, "Crescimento", crescimento, headerColor);

		document.add(table);
	}

	// MÉTODO: Adicionar Célula de Métrica
	private void adicionarCelulaMetrica(PdfPTable table, String label, String value, BaseColor color) {

		// Célula do label
		PdfPCell labelCell = new PdfPCell(new Phrase(label, NORMAL_FONT));
		labelCell.setBackgroundColor(color);
		labelCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		labelCell.setPadding(10);

		// Célula do valor
		PdfPCell valueCell = new PdfPCell(new Phrase(value, TITLE_FONT));
		valueCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		valueCell.setPadding(15);

		table.addCell(labelCell);
		table.addCell(valueCell);
	}

	// MÉTODO: Adicionar Tabela de Produtos
	private void adicionarTabelaProdutos(Document document, List<ProdutoTopDTO> produtos) throws DocumentException {

		Paragraph subtitle = new Paragraph("Top 10 Produtos Mais Vendidos", SUBTITLE_FONT);
		subtitle.setSpacingAfter(10);
		document.add(subtitle);

		PdfPTable table = new PdfPTable(4);
		table.setWidthPercentage(100);
		table.setWidths(new float[] { 1, 4, 2, 2 });
		table.setSpacingAfter(20);

		BaseColor headerColor = new BaseColor(102, 126, 234);
		adicionarCabecalhoTabela(table, "#", headerColor);
		adicionarCabecalhoTabela(table, "Produto", headerColor);
		adicionarCabecalhoTabela(table, "Quantidade", headerColor);
		adicionarCabecalhoTabela(table, "Total", headerColor);

		int rank = 1;
		for (ProdutoTopDTO produto : produtos) {
			table.addCell(criarCelula(String.valueOf(rank++)));
			table.addCell(criarCelula(produto.getNomeProduto()));
			table.addCell(criarCelula(String.format("%,d", produto.getQuantidadeVendida())));
			table.addCell(criarCelula(String.format("R$ %,.2f", produto.getTotalVendido())));
		}

		document.add(table);
	}

	// MÉTODO: Adicionar Tabela de Lojas
	private void adicionarTabelaLojas(Document document, List<VendasPorLojaDTO> lojas) throws DocumentException {

		Paragraph subtitle = new Paragraph("Top 10 Lojas", SUBTITLE_FONT);
		subtitle.setSpacingAfter(10);
		document.add(subtitle);

		PdfPTable table = new PdfPTable(5);
		table.setWidthPercentage(100);
		table.setWidths(new float[] { 1, 3, 2, 2, 2 });
		table.setSpacingAfter(20);

		BaseColor headerColor = new BaseColor(102, 126, 234);
		adicionarCabecalhoTabela(table, "#", headerColor);
		adicionarCabecalhoTabela(table, "Loja", headerColor);
		adicionarCabecalhoTabela(table, "Cidade/UF", headerColor);
		adicionarCabecalhoTabela(table, "Vendas", headerColor);
		adicionarCabecalhoTabela(table, "Total", headerColor);

		int rank = 1;
		for (VendasPorLojaDTO loja : lojas) {
			table.addCell(criarCelula(String.valueOf(rank++)));
			table.addCell(criarCelula(loja.getNomeLoja()));
			table.addCell(criarCelula(loja.getCidade() + "/" + loja.getEstado()));
			table.addCell(criarCelula(String.format("%,d", loja.getQuantidade())));
			table.addCell(criarCelula(String.format("R$ %,.2f", loja.getTotal())));
		}

		document.add(table);
	}

	// MÉTODO: Adicionar Vendas por Canal
	private void adicionarVendasPorCanal(Document document, List<VendasPorCanalDTO> canais) throws DocumentException {

		Paragraph subtitle = new Paragraph("Vendas por Canal", SUBTITLE_FONT);
		subtitle.setSpacingAfter(10);
		document.add(subtitle);

		PdfPTable table = new PdfPTable(4);
		table.setWidthPercentage(100);
		table.setWidths(new float[] { 3, 2, 2, 2 });
		table.setSpacingAfter(20);

		BaseColor headerColor = new BaseColor(102, 126, 234);
		adicionarCabecalhoTabela(table, "Canal", headerColor);
		adicionarCabecalhoTabela(table, "Tipo", headerColor);
		adicionarCabecalhoTabela(table, "Vendas", headerColor);
		adicionarCabecalhoTabela(table, "Total", headerColor);

		for (VendasPorCanalDTO canal : canais) {
			table.addCell(criarCelula(canal.getNomeCanal()));
			String tipo = "P".equals(canal.getTipoCanal()) ? "Presencial" : "Delivery";
			table.addCell(criarCelula(tipo));
			table.addCell(criarCelula(String.format("%,d", canal.getQuantidade())));
			table.addCell(criarCelula(String.format("R$ %,.2f", canal.getTotal())));
		}

		document.add(table);
	}

	// MÉTODO: Adicionar Rodapé
	private void adicionarRodape(Document document) throws DocumentException {

		document.add(Chunk.NEWLINE);
		document.add(new LineSeparator());

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
		String dataGeracao = LocalDateTime.now().format(formatter);

		Paragraph footer = new Paragraph("Relatório gerado em " + dataGeracao,
				new Font(Font.FontFamily.HELVETICA, 8, Font.ITALIC, BaseColor.GRAY));
		footer.setAlignment(Element.ALIGN_CENTER);
		footer.setSpacingBefore(10);

		document.add(footer);
	}

	// MÉTODOS AUXILIARES
	private void adicionarCabecalhoTabela(PdfPTable table, String texto, BaseColor cor) {
		PdfPCell cell = new PdfPCell(new Phrase(texto, HEADER_FONT));
		cell.setBackgroundColor(cor);
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setPadding(8);
		table.addCell(cell);
	}

	private PdfPCell criarCelula(String texto) {
		PdfPCell cell = new PdfPCell(new Phrase(texto, NORMAL_FONT));
		cell.setPadding(5);
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		return cell;
	}
}