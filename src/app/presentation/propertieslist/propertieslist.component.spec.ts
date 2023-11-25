import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertieslistComponent } from './propertieslist.component';

describe('PropertieslistComponent', () => {
  let component: PropertieslistComponent;
  let fixture: ComponentFixture<PropertieslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertieslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertieslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
