import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDniModalComponent } from './client-dni-modal.component';

describe('ClientDniModalComponent', () => {
  let component: ClientDniModalComponent;
  let fixture: ComponentFixture<ClientDniModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDniModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDniModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
