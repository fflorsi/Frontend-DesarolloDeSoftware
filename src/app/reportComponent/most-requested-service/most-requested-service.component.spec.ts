import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRequestedServiceComponent } from './most-requested-service.component';

describe('MostRequestedServiceComponent', () => {
  let component: MostRequestedServiceComponent;
  let fixture: ComponentFixture<MostRequestedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostRequestedServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostRequestedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
