import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnoseVehicleCredentialsComponent } from './diagnose-vehicle-credentials.component';

describe('DiagnoseVehicleCredentialsComponent', () => {
  let component: DiagnoseVehicleCredentialsComponent;
  let fixture: ComponentFixture<DiagnoseVehicleCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnoseVehicleCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnoseVehicleCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
