import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteObservationDialogComponent } from './delete-observation-dialog.component';

describe('DeleteObservationDialogComponent', () => {
  let component: DeleteObservationDialogComponent;
  let fixture: ComponentFixture<DeleteObservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteObservationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteObservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
