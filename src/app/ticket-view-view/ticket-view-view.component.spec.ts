import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketViewViewComponent } from './ticket-view-view.component';

describe('TicketViewViewComponent', () => {
  let component: TicketViewViewComponent;
  let fixture: ComponentFixture<TicketViewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketViewViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
