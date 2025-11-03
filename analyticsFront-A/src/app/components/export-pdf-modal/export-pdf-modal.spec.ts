// src/app/components/export-pdf-modal/export-pdf-modal.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ExportPdfModalComponent } from './export-pdf-modal.component';
import { DashboardService } from '../../services/dashboard.service';

describe('ExportPdfModalComponent', () => {
  let component: ExportPdfModalComponent;
  let fixture: ComponentFixture<ExportPdfModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportPdfModalComponent],
      providers: [
        DashboardService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExportPdfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir e fechar o modal', () => {
    component.open();
    expect(component.isOpen).toBeTrue();

    component.close();
    expect(component.isOpen).toBeFalse();
  });

  it('deve inicializar com datas padrão', () => {
    component.open();
    expect(component.dataInicio).toBeTruthy();
    expect(component.dataFim).toBeTruthy();
  });
});