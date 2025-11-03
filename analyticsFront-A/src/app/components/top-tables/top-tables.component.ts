import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoTop, VendasPorLoja } from '../../models';

@Component({
  selector: 'app-top-tables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-tables.component.html',
  styleUrls: ['./top-tables.component.scss']
})
export class TopTablesComponent {
  
  // Lista de produtos mais vendidos
  @Input() topProdutos: ProdutoTop[] = [];
  
  // Lista de lojas com melhor performance
  @Input() topLojas: VendasPorLoja[] = [];
  
  // Formata valor para moeda brasileira
  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }
  
  // Formata números com separadores (1.000, 10.000, etc)
  formatarNumero(valor: number): string {
    return new Intl.NumberFormat('pt-BR').format(valor);
  }
  
  // Retorna emoji de medalha para as primeiras posições
  getMedalha(index: number): string {
    switch (index) {
      case 0: return '🥇'; // Primeiro lugar
      case 1: return '🥈'; // Segundo lugar
      case 2: return '🥉'; // Terceiro lugar
      default: return `${index + 1}º`; // Demais posições
    }
  }
  
  // Retorna classe CSS para destacar as primeiras posições
  getClassePosicao(index: number): string {
    if (index === 0) return 'gold';
    if (index === 1) return 'silver';
    if (index === 2) return 'bronze';
    return '';
  }
}