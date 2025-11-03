import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent {
  
  // Datas selecionadas pelo usuário
  dataInicio: string = '';
  dataFim: string = '';
  
  // Evento emitido quando o filtro é aplicado
  @Output() filtroAplicado = new EventEmitter<{ inicio: Date, fim: Date }>();
  
  constructor() {
    // Inicializa com os últimos 30 dias por padrão
    this.inicializarDatasDefault();
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
  
  // Aplica o filtro com as datas selecionadas
  aplicarFiltro(): void {
    // Valida se as datas foram preenchidas
    if (!this.dataInicio || !this.dataFim) {
      alert('Por favor, selecione as datas de início e fim');
      return;
    }
    
    const inicio = new Date(this.dataInicio + 'T00:00:00');
    const fim = new Date(this.dataFim + 'T23:59:59');
    
    // Valida se a data de início é anterior à data de fim
    if (inicio > fim) {
      alert('Data de início deve ser anterior à data de fim');
      return;
    }
    
    // Envia as datas para o componente pai
    this.filtroAplicado.emit({ inicio, fim });
  }
  
  // Aplica períodos pré-definidos (7, 30, 90 dias)
  aplicarPeriodo(dias: number): void {
    const hoje = new Date();
    const dataInicial = new Date();
    dataInicial.setDate(hoje.getDate() - dias);
    
    this.dataInicio = this.formatarDataParaInput(dataInicial);
    this.dataFim = this.formatarDataParaInput(hoje);
    
    // Aplica o filtro automaticamente
    this.aplicarFiltro();
  }
}