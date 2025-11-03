import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTimelineChartComponent } from './sales-timeline-chart.component';

describe('SalesTimelineChartComponent', () => {
  let component: SalesTimelineChartComponent;
  let fixture: ComponentFixture<SalesTimelineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesTimelineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesTimelineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
