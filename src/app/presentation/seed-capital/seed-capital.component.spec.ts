import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedCapitalComponent } from './seed-capital.component';

describe('SeedCapitalComponent', () => {
  let component: SeedCapitalComponent;
  let fixture: ComponentFixture<SeedCapitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedCapitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
