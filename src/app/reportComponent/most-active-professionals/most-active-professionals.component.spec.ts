import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostActiveProfessionalsComponent } from './most-active-professionals.component';

describe('MostActiveProfessionalsComponent', () => {
  let component: MostActiveProfessionalsComponent;
  let fixture: ComponentFixture<MostActiveProfessionalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostActiveProfessionalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostActiveProfessionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
