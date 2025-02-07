import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostAttendedPetsComponent } from './most-attended-pets.component';

describe('MostAttendedPetsComponent', () => {
  let component: MostAttendedPetsComponent;
  let fixture: ComponentFixture<MostAttendedPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostAttendedPetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostAttendedPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
