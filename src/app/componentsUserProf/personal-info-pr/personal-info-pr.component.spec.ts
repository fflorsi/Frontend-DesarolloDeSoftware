import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoPrComponent } from './personal-info-pr.component';

describe('PersonalInfoPrComponent', () => {
  let component: PersonalInfoPrComponent;
  let fixture: ComponentFixture<PersonalInfoPrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInfoPrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInfoPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
