import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IphWidgetComponent } from './iph-widget.component';

describe('IphWidgetComponent', () => {
  let component: IphWidgetComponent;
  let fixture: ComponentFixture<IphWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IphWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IphWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
