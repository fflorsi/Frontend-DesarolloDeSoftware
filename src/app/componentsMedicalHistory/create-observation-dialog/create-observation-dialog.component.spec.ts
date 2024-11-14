import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateObservationDialogComponent } from './create-observation-dialog.component';

describe('CreateObservationDialogComponent', () => {
  let component: CreateObservationDialogComponent;
  let fixture: ComponentFixture<CreateObservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateObservationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateObservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
