import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObservationDialogComponent } from './edit-observation-dialog-component.component';

describe('EditObservationDialogComponentComponent', () => {
  let component: EditObservationDialogComponent;
  let fixture: ComponentFixture<EditObservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditObservationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditObservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
