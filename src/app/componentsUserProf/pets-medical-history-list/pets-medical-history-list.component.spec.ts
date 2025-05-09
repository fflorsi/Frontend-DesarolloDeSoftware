import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsMedicalHistoryListComponent } from './pets-medical-history-list.component';

describe('PetsMedicalHistoryListComponent', () => {
  let component: PetsMedicalHistoryListComponent;
  let fixture: ComponentFixture<PetsMedicalHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsMedicalHistoryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsMedicalHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
