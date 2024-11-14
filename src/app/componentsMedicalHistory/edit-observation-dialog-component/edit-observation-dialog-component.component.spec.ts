import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObservationDialogComponentComponent } from './edit-observation-dialog-component.component';

describe('EditObservationDialogComponentComponent', () => {
  let component: EditObservationDialogComponentComponent;
  let fixture: ComponentFixture<EditObservationDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditObservationDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditObservationDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
