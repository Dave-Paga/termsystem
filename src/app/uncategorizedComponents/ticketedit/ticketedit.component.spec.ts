import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketeditComponent } from './ticketedit.component';

describe('TicketeditComponent', () => {
  let component: TicketeditComponent;
  let fixture: ComponentFixture<TicketeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
