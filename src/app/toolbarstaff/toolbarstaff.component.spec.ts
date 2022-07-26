import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarstaffComponent } from './toolbarstaff.component';

describe('ToolbarstaffComponent', () => {
  let component: ToolbarstaffComponent;
  let fixture: ComponentFixture<ToolbarstaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarstaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
