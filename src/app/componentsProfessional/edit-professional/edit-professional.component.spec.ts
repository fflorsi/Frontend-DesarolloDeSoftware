import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfessionalComponent } from './edit-professional.component';

describe('EditProfessionalComponent', () => {
  let component: EditProfessionalComponent;
  let fixture: ComponentFixture<EditProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfessionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
