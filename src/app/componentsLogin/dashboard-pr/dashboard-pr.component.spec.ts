import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPrComponent } from './dashboard-pr.component';

describe('DashboardPrComponent', () => {
  let component: DashboardPrComponent;
  let fixture: ComponentFixture<DashboardPrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
