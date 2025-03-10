import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOrdersDetailComponent } from './client-orders-detail.component';

describe('ClientOrdersDetailComponent', () => {
  let component: ClientOrdersDetailComponent;
  let fixture: ComponentFixture<ClientOrdersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientOrdersDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientOrdersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
