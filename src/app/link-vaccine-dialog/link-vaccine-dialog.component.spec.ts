import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkVaccineDialogComponent } from './link-vaccine-dialog.component';

describe('LinkVaccineDialogComponent', () => {
  let component: LinkVaccineDialogComponent;
  let fixture: ComponentFixture<LinkVaccineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkVaccineDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkVaccineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
