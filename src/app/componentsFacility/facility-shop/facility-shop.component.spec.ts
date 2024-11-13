import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityShopComponent } from './facility-shop.component';

describe('FacilityShopComponent', () => {
  let component: FacilityShopComponent;
  let fixture: ComponentFixture<FacilityShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
