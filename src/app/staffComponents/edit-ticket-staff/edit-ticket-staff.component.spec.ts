import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTicketStaffComponent } from './edit-ticket-staff.component';

describe('EditTicketStaffComponent', () => {
  let component: EditTicketStaffComponent;
  let fixture: ComponentFixture<EditTicketStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTicketStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTicketStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
