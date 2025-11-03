// src/app/components/dashboard/dashboard.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardResumo, VendasPorCanal } from '../../models';

// Mock data
const MOCK_DASHBOARD_DATA: DashboardResumo = {
  faturamentoTotal: 1500000.75,
  totalVendas: 50000,
  ticketMedio: 30.00,
  crescimentoPercentual: 15.5,
  topProdutos: [
    { produtoId: 1, nomeProduto: 'Pizza Margherita', quantidadeVendida: 2500, totalVendido: 75000.00 }
  ],
  vendasPorCanal: [
    { nomeCanal: 'iFood', tipoCanal: 'D', quantidade: 15000, total: 450000.00, ticketMedio: 30.00 }
  ],
  vendasPorHora: [
    { hora: 12, quantidade: 850, total: 25500.00 }
  ],
  vendasPorDia: [
    { data: '2024-01-01', quantidade: 2500, total: 75000.00 }
  ],
  topLojas: [
    { lojaId: 1, nomeLoja: 'Loja Shopping', cidade: 'São Paulo', estado: 'SP', quantidade: 15000, total: 450000.00, ticketMedio: 30.00 }
  ],
  vendasPorDiaSemana: [
    { diaSemana: 0, nomeDia: 'Domingo', quantidade: 85000, total: 2550000.00 }
  ]
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: jasmine.SpyObj<DashboardService>;

  beforeEach(async () => {
    // Previne reloads de página
    window.onbeforeunload = () => { };
    window.onunload = () => { };

    const dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getResumoCompleto']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar dados com sucesso', () => {
    dashboardService.getResumoCompleto.and.returnValue(of(MOCK_DASHBOARD_DATA));

    component.ngOnInit();

    expect(dashboardService.getResumoCompleto).toHaveBeenCalled();
    expect(component.dashboardData).toEqual(MOCK_DASHBOARD_DATA);
    expect(component.loading).toBeFalse();
  });

  it('deve tratar erro ao carregar dados', () => {
    dashboardService.getResumoCompleto.and.returnValue(throwError(() => new Error('Erro API')));

    component.carregarDados();

    // CORREÇÃO: Verifica a mensagem real do erro
    expect(component.error).toBe('Erro API');
    expect(component.loading).toBeFalse();
  });

  it('deve aplicar filtros', () => {
    const filtroData = {
      inicio: new Date('2024-01-01'),
      fim: new Date('2024-01-31')
    };

    dashboardService.getResumoCompleto.and.returnValue(of(MOCK_DASHBOARD_DATA));

    component.aplicarFiltros(filtroData);

    expect(component.dataInicio).toEqual(filtroData.inicio);
    expect(component.dataFim).toEqual(filtroData.fim);
  });
});