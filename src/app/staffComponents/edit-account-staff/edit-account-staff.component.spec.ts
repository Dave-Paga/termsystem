import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountStaffComponent } from './edit-account-staff.component';

describe('EditAccountStaffComponent', () => {
  let component: EditAccountStaffComponent;
  let fixture: ComponentFixture<EditAccountStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAccountStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
