import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByChannelChartComponent } from './sales-by-channel-chart.component';

describe('SalesByChannelChartComponent', () => {
  let component: SalesByChannelChartComponent;
  let fixture: ComponentFixture<SalesByChannelChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesByChannelChartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SalesByChannelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
