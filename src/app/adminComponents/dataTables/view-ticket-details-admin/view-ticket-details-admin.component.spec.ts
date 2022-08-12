import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketDetailsAdminComponent } from './view-ticket-details-admin.component';

describe('ViewTicketDetailsAdminComponent', () => {
  let component: ViewTicketDetailsAdminComponent;
  let fixture: ComponentFixture<ViewTicketDetailsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTicketDetailsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTicketDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
