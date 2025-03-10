import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMonthlySpendingComponent } from './client-monthly-spending.component';

describe('ClientMonthlySpendingComponent', () => {
  let component: ClientMonthlySpendingComponent;
  let fixture: ComponentFixture<ClientMonthlySpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientMonthlySpendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMonthlySpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
