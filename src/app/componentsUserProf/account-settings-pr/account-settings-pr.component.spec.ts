import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsPrComponent } from './account-settings-pr.component';

describe('AccountSettingsPrComponent', () => {
  let component: AccountSettingsPrComponent;
  let fixture: ComponentFixture<AccountSettingsPrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSettingsPrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSettingsPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
