import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingEmployeesViewComponent } from './scheduling-employees-view.component';

describe('SchedulingEmployeesViewComponent', () => {
  let component: SchedulingEmployeesViewComponent;
  let fixture: ComponentFixture<SchedulingEmployeesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingEmployeesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingEmployeesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
