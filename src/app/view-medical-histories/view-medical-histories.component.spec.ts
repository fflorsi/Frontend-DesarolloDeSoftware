import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicalHistoriesComponent } from './view-medical-histories.component';

describe('ViewMedicalHistoriesComponent', () => {
  let component: ViewMedicalHistoriesComponent;
  let fixture: ComponentFixture<ViewMedicalHistoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMedicalHistoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMedicalHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
