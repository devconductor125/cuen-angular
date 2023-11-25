import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCostComponent } from './view-cost.component';

describe('ViewCostComponent', () => {
  let component: ViewCostComponent;
  let fixture: ComponentFixture<ViewCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
