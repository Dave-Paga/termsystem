import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTicketAdminModalComponent } from './edit-ticket-admin-modal.component';

describe('EditTicketAdminModalComponent', () => {
  let component: EditTicketAdminModalComponent;
  let fixture: ComponentFixture<EditTicketAdminModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTicketAdminModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTicketAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
