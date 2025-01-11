import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfessionalListComponent } from './user-professional-list.component';

describe('UserProfessionalListComponent', () => {
  let component: UserProfessionalListComponent;
  let fixture: ComponentFixture<UserProfessionalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfessionalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfessionalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
