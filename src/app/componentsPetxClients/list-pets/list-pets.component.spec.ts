import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPetsComponent } from './list-pets.component';

describe('ListPetsComponent', () => {
  let component: ListPetsComponent;
  let fixture: ComponentFixture<ListPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
