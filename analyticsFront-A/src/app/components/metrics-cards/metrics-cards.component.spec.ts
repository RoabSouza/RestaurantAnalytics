// src/app/components/metrics-cards/metrics-cards.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetricsCardsComponent } from './metrics-cards.component';
import { DashboardResumo } from '../../models';

const MOCK_DATA: DashboardResumo = {
  faturamentoTotal: 15234567.89,
  totalVendas: 500000,
  ticketMedio: 30.47,
  crescimentoPercentual: 15.5,
  topProdutos: [],
  vendasPorCanal: [],
  vendasPorHora: [],
  vendasPorDia: [],
  topLojas: [],
  vendasPorDiaSemana: []
};

describe('MetricsCardsComponent', () => {
  let component: MetricsCardsComponent;
  let fixture: ComponentFixture<MetricsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsCardsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MetricsCardsComponent);
    component = fixture.componentInstance;
    component.data = MOCK_DATA;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve formatar moeda corretamente', () => {
    const resultado = component.formatarMoeda(15234567.89);
    expect(resultado).toContain('R$');
  });

  it('deve retornar classe positiva para crescimento > 0', () => {
    component.data.crescimentoPercentual = 15.5;
    const classe = component.getClasseCrescimento();
    expect(classe).toBe('crescimento-positivo');
  });
});