import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookAppointmentComponent } from './user-book-appointment.component';

describe('UserBookAppointmentComponent', () => {
  let component: UserBookAppointmentComponent;
  let fixture: ComponentFixture<UserBookAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
