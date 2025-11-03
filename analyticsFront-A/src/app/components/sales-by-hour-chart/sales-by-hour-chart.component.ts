import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { VendasPorHora } from '../../models';

@Component({
  selector: 'app-sales-by-hour-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './sales-by-hour-chart.component.html',
  styleUrls: ['./sales-by-hour-chart.component.scss']
})
export class SalesByHourChartComponent implements OnChanges {
  
  // Dados de vendas por hora do dia
  @Input() data: VendasPorHora[] = [];
  
  // Configuração dos dados do gráfico de barras
  public chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{
      label: 'Faturamento',
      data: [],
      backgroundColor: 'rgba(102, 126, 234, 0.7)',
      borderColor: 'rgba(102, 126, 234, 1)',
      borderWidth: 2,
      borderRadius: 8,
      hoverBackgroundColor: 'rgba(102, 126, 234, 0.9)'
    }]
  };
  
  // Opções de configuração do gráfico
  public chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Formata os valores do eixo Y (R$ 1K, R$ 1M, etc)
          callback: (value) => {
            const num = typeof value === 'number' ? value : 0;
            if (num >= 1000000) {
              return 'R$ ' + (num / 1000000).toFixed(1) + 'M';
            } else if (num >= 1000) {
              return 'R$ ' + (num / 1000).toFixed(0) + 'K';
            }
            return 'R$ ' + num;
          }
        }
      },
      x: {
        grid: {
          display: false // Remove linhas de grid do eixo X
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          // Formata o valor no tooltip
          label: (context) => {
            const value = context.parsed.y ?? 0;
            const formatted = new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(value);
            
            return `Faturamento: ${formatted}`;
          }
        }
      }
    }
  };
  
  // Atualiza o gráfico quando os dados mudam
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data && this.data.length > 0) {
      this.atualizarGrafico();
    }
  }
  
  // Prepara os dados para o gráfico
  private atualizarGrafico(): void {
    // Ordena os dados por hora (0 a 23)
    const dadosOrdenados = [...this.data].sort((a, b) => a.hora - b.hora);
    
    // Formata os labels com a hora (0h, 1h, 2h, etc)
    this.chartData.labels = dadosOrdenados.map(item => `${item.hora}h`);
    
    // Extrai os valores totais para o gráfico
    this.chartData.datasets[0].data = dadosOrdenados.map(item => item.total);
  }
}