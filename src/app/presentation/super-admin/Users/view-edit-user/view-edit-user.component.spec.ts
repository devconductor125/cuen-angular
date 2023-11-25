import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditUserComponent } from './view-edit-user.component';

describe('ViewEditUserComponent', () => {
  let component: ViewEditUserComponent;
  let fixture: ComponentFixture<ViewEditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
