import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllProfessionalComponent } from './view-all-professional.component';

describe('ViewAllProfessionalComponent', () => {
  let component: ViewAllProfessionalComponent;
  let fixture: ComponentFixture<ViewAllProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllProfessionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
