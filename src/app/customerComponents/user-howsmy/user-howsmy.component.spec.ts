import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHowsmyComponent } from './user-howsmy.component';

describe('UserHowsmyComponent', () => {
  let component: UserHowsmyComponent;
  let fixture: ComponentFixture<UserHowsmyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHowsmyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHowsmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
