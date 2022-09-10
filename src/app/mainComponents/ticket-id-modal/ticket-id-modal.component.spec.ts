import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketIDModalComponent } from './ticket-id-modal.component';

describe('TicketIDModalComponent', () => {
  let component: TicketIDModalComponent;
  let fixture: ComponentFixture<TicketIDModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketIDModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketIDModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
