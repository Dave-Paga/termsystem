import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingToolBarComponent } from './landing-tool-bar.component';

describe('LandingToolBarComponent', () => {
  let component: LandingToolBarComponent;
  let fixture: ComponentFixture<LandingToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingToolBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
