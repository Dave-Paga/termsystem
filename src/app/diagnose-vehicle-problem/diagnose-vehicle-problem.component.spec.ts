import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnoseVehicleProblemComponent } from './diagnose-vehicle-problem.component';

describe('DiagnoseVehicleProblemComponent', () => {
  let component: DiagnoseVehicleProblemComponent;
  let fixture: ComponentFixture<DiagnoseVehicleProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnoseVehicleProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnoseVehicleProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
