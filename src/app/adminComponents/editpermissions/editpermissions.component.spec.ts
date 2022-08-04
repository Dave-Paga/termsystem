import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpermissionsComponent } from './editpermissions.component';

describe('EditpermissionsComponent', () => {
  let component: EditpermissionsComponent;
  let fixture: ComponentFixture<EditpermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
