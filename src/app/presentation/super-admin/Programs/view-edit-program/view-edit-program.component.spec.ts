import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditProgramComponent } from './view-edit-program.component';

describe('ViewEditProgramComponent', () => {
  let component: ViewEditProgramComponent;
  let fixture: ComponentFixture<ViewEditProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
