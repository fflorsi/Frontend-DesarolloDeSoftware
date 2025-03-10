import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostAttendedFacilitiesComponent } from './most-attended-facilities.component';

describe('MostAttendedFacilitiesComponent', () => {
  let component: MostAttendedFacilitiesComponent;
  let fixture: ComponentFixture<MostAttendedFacilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostAttendedFacilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostAttendedFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
