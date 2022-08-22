import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicingStaffComponent } from './servicing-staff.component';

describe('ServicingStaffComponent', () => {
  let component: ServicingStaffComponent;
  let fixture: ComponentFixture<ServicingStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicingStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicingStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
