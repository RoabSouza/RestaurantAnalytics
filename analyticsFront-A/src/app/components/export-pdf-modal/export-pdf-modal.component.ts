import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-export-pdf-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './export-pdf-modal.component.html',
  styleUrls: ['./export-pdf-modal.component.scss']
})
export class ExportPdfModalComponent {

  // Estado do modal
  isOpen = false;
  dataInicio: string = '';
  dataFim: string = '';
  exportando = false;

  // Evento emitido quando o modal é fechado
  @Output() closed = new EventEmitter<void>();

  constructor(private dashboardService: DashboardService) {
    this.inicializarDatasDefault();
  }

  // Abre o modal e inicializa as datas
  open(): void {
    this.isOpen = true;
    this.inicializarDatasDefault();
  }

  // Fecha o modal e emite evento
  close(): void {
    this.isOpen = false;
    this.closed.emit();
  }

  // Define as datas padrão (últimos 30 dias)
  private inicializarDatasDefault(): void {
    const hoje = new Date();
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);

    this.dataFim = this.formatarDataParaInput(hoje);
    this.dataInicio = this.formatarDataParaInput(trintaDiasAtras);
  }

  // Formata data para o formato do input HTML (YYYY-MM-DD)
  private formatarDataParaInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Processa a exportação do PDF
  async exportar(): Promise<void> {
    // Valida se as datas foram preenchidas
    if (!this.dataInicio || !this.dataFim) {
      alert('Por favor, selecione as datas');
      return;
    }

    const inicio = new Date(this.dataInicio + 'T00:00:00');
    const fim = new Date(this.dataFim + 'T23:59:59');

    // Valida se a data de início é anterior à data de fim
    if (inicio > fim) {
      alert('Data de início deve ser anterior à data de fim');
      return;
    }

    this.exportando = true;

    try {
      // Cria a URL para download do PDF
      const url = this.construirUrlExport(inicio, fim);

      // Cria link para download
      const link = document.createElement('a');
      link.href = url;
      link.download = `dashboard_${this.formatarDataArquivo(new Date())}.pdf`;
      link.click();

      // Fecha o modal após um breve delay
      setTimeout(() => {
        this.exportando = false;
        this.close();
      }, 1000);

    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert('Erro ao exportar PDF. Tente novamente.');
      this.exportando = false;
    }
  }

  // Constrói a URL para exportação do PDF
  private construirUrlExport(inicio: Date, fim: Date): string {
    const baseUrl = 'http://localhost:8080/api/dashboard/export/pdf';
    const inicioISO = this.formatarDataParaISO(inicio);
    const fimISO = this.formatarDataParaISO(fim);

    return `${baseUrl}?inicio=${inicioISO}&fim=${fimISO}`;
  }

  // Formata data para formato ISO (YYYY-MM-DDTHH:mm:ss)
  private formatarDataParaISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  // Formata data para nome do arquivo (YYYYMMDD_HHmm)
  private formatarDataArquivo(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}${month}${day}_${hours}${minutes}`;
  }

  // Aplica períodos pré-definidos (7, 30, 90 dias)
  aplicarPeriodo(dias: number): void {
    const hoje = new Date();
    const dataInicial = new Date();
    dataInicial.setDate(hoje.getDate() - dias);

    this.dataInicio = this.formatarDataParaInput(dataInicial);
    this.dataFim = this.formatarDataParaInput(hoje);
  }
}