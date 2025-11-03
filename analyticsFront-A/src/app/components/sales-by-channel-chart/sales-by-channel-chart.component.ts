import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { VendasPorCanal } from '../../models';

// Registra todos os componentes do Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-sales-by-channel-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './sales-by-channel-chart.component.html',
  styleUrls: ['./sales-by-channel-chart.component.scss']
})
export class SalesByChannelChartComponent implements OnChanges, OnInit {
  
  // Dados de vendas por canal recebidos do componente pai
  @Input() data: VendasPorCanal[] = [];
  
  // Configuração dos dados do gráfico de pizza
  public chartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#FF6384', // Rosa - iFood
        '#36A2EB', // Azul - Presencial
        '#FFCE56', // Amarelo - Rappi
        '#4BC0C0', // Verde-água - Uber Eats
        '#9966FF', // Roxo - Outros
        '#FF9F40', // Laranja - Delivery próprio
      ],
      hoverBackgroundColor: [
        '#FF4069',
        '#2690D9',
        '#FFB300',
        '#3AA8A8',
        '#7D4DFF',
        '#FF8822',
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };
  
  // Opções de configuração do gráfico
  public chartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          // Formata o texto do tooltip com valor e percentual
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            
            // Formata o valor em reais
            const formatted = new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(value);
            
            // Calcula o percentual em relação ao total
            const total = context.dataset.data.reduce((acc: number, curr) => 
              acc + (typeof curr === 'number' ? curr : 0), 0
            );
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            
            return `${label}: ${formatted} (${percentage}%)`;
          }
        }
      }
    }
  };
  
  // Executado quando o componente é criado
  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      this.atualizarGrafico();
    }
  }
  
  // Executado quando os dados de entrada mudam
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data && this.data.length > 0) {
      this.atualizarGrafico();
    }
  }
  
  // Prepara os dados para o gráfico de pizza
  private atualizarGrafico(): void {
    // Extrai os nomes dos canais para os labels
    this.chartData.labels = this.data.map(item => item.nomeCanal);
    
    // Extrai os valores totais para o gráfico
    this.chartData.datasets[0].data = this.data.map(item => item.total);
  }
}