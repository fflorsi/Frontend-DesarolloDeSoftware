import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalReportsComponent } from './professional-reports.component';

describe('ProfessionalReportsComponent', () => {
  let component: ProfessionalReportsComponent;
  let fixture: ComponentFixture<ProfessionalReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
