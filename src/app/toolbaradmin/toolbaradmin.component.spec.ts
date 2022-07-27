import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbaradminComponent } from './toolbaradmin.component';

describe('ToolbaradminComponent', () => {
  let component: ToolbaradminComponent;
  let fixture: ComponentFixture<ToolbaradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbaradminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbaradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
