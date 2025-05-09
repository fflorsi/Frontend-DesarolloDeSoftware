import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredClientsAndPetsComponent } from './registered-clients-and-pets.component';

describe('RegisteredClientsAndPetsComponent', () => {
  let component: RegisteredClientsAndPetsComponent;
  let fixture: ComponentFixture<RegisteredClientsAndPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredClientsAndPetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredClientsAndPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
