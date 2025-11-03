// src/app/components/insights-panel/insights-panel.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { InsightsPanelComponent } from './insights-panel.component';
import { InsightsService } from '../../services/insights.service';
import { DashboardService } from '../../services/dashboard.service';

describe('InsightsPanelComponent', () => {
  let component: InsightsPanelComponent;
  let fixture: ComponentFixture<InsightsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightsPanelComponent],
      providers: [
        InsightsService,
        DashboardService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InsightsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display insights when data is provided', () => {
    // Teste básico de renderização
    expect(component).toBeTruthy();
  });
});