import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTablesComponent } from './top-tables.component';

describe('TopTablesComponent', () => {
  let component: TopTablesComponent;
  let fixture: ComponentFixture<TopTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
