import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientPetComponent } from './view-client-pet.component';

describe('ViewClientPetComponent', () => {
  let component: ViewClientPetComponent;
  let fixture: ComponentFixture<ViewClientPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClientPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClientPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
