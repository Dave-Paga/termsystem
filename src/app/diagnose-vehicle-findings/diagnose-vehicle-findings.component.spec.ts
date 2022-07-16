import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnoseVehicleFindingsComponent } from './diagnose-vehicle-findings.component';

describe('DiagnoseVehicleFindingsComponent', () => {
  let component: DiagnoseVehicleFindingsComponent;
  let fixture: ComponentFixture<DiagnoseVehicleFindingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnoseVehicleFindingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnoseVehicleFindingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
