import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoitmentsByProfessionalComponent } from './appointments-by-professional.component';

describe('AppoitmentsByProfessionalComponent', () => {
  let component: AppoitmentsByProfessionalComponent;
  let fixture: ComponentFixture<AppoitmentsByProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppoitmentsByProfessionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoitmentsByProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
