import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { VendasPorDia } from '../../models';

@Component({
  selector: 'app-sales-timeline-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './sales-timeline-chart.component.html',
  styleUrls: ['./sales-timeline-chart.component.scss']
})
export class SalesTimelineChartComponent implements OnChanges {

  // Dados de vendas por dia para o gráfico
  @Input() data: VendasPorDia[] = [];

  // Configuração dos dados do gráfico
  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      label: 'Faturamento Diário',
      data: [],
      fill: true,
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      borderColor: 'rgba(102, 126, 234, 1)',
      borderWidth: 3,
      tension: 0.4, // Linha mais suave
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: 'rgba(102, 126, 234, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }]
  };

  // Opções de configuração do gráfico
  public chartOptions: ChartConfiguration<'line'>['options'] = {
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
          // Formata o título do tooltip com data completa
          title: (context) => {
            const index = context[0].dataIndex;
            const dataStr = this.data[index]?.data;
            if (dataStr) {
              const date = new Date(dataStr);
              return date.toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
            }
            return '';
          },
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
    // Ordena os dados por data
    const dadosOrdenados = [...this.data].sort((a, b) =>
      new Date(a.data).getTime() - new Date(b.data).getTime()
    );

    // Formata as datas para os labels (DD/MM)
    this.chartData.labels = dadosOrdenados.map(item => {
      const date = new Date(item.data);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    });

    // Extrai os valores totais para o gráfico
    this.chartData.datasets[0].data = dadosOrdenados.map(item => item.total);
  }
}