import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingEmployeesEditComponent } from './scheduling-employees-edit.component';

describe('SchedulingEmployeesEditComponent', () => {
  let component: SchedulingEmployeesEditComponent;
  let fixture: ComponentFixture<SchedulingEmployeesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingEmployeesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingEmployeesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
