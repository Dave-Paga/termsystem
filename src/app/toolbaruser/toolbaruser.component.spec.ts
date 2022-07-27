import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbaruserComponent } from './toolbaruser.component';

describe('ToolbaruserComponent', () => {
  let component: ToolbaruserComponent;
  let fixture: ComponentFixture<ToolbaruserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbaruserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbaruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
