import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllPetComponent } from './view-all-pet.component';

describe('ViewAllPetComponent', () => {
  let component: ViewAllPetComponent;
  let fixture: ComponentFixture<ViewAllPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
