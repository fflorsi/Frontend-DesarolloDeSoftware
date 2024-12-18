import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShopComponent } from './product-shop.component';

describe('ProductShopComponent', () => {
  let component: ProductShopComponent;
  let fixture: ComponentFixture<ProductShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
