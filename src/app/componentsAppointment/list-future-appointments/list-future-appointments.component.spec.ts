import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFutureAppointmentsComponent } from './list-future-appointments.component';

describe('ListFutureAppointmentsComponent', () => {
  let component: ListFutureAppointmentsComponent;
  let fixture: ComponentFixture<ListFutureAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFutureAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFutureAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
