import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowsmyvehicleComponent } from './howsmyvehicle.component';

describe('HowsmyvehicleComponent', () => {
  let component: HowsmyvehicleComponent;
  let fixture: ComponentFixture<HowsmyvehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowsmyvehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowsmyvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
