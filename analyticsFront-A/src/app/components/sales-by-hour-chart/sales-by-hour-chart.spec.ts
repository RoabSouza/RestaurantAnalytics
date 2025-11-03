import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByHourChartComponent } from './sales-by-hour-chart.component';

describe('SalesByHourChartComponent', () => {
  let component: SalesByHourChartComponent;
  let fixture: ComponentFixture<SalesByHourChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesByHourChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesByHourChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
