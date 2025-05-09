import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostUsedFacilitiesComponent } from './most-used-facilities.component';

describe('MostUsedFacilitiesComponent', () => {
  let component: MostUsedFacilitiesComponent;
  let fixture: ComponentFixture<MostUsedFacilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostUsedFacilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostUsedFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
