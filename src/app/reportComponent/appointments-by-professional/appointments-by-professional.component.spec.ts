import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsByProfessionalComponent } from './appointments-by-professional.component';

describe('AppoitmentsByProfessionalComponent', () => {
  let component: AppointmentsByProfessionalComponent;
  let fixture: ComponentFixture<AppointmentsByProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsByProfessionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsByProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
