import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPetProComponent } from './view-pet-pro.component';

describe('ViewPetProComponent', () => {
  let component: ViewPetProComponent;
  let fixture: ComponentFixture<ViewPetProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPetProComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPetProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
