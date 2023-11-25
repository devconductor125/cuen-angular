import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIphComponent } from './report-iph.component';

describe('ReportIphComponent', () => {
  let component: ReportIphComponent;
  let fixture: ComponentFixture<ReportIphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
