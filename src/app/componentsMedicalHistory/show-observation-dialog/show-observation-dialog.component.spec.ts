import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowObservationDialogComponent } from './show-observation-dialog.component';

describe('ShowObservationDialogComponent', () => {
  let component: ShowObservationDialogComponent;
  let fixture: ComponentFixture<ShowObservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowObservationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowObservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
