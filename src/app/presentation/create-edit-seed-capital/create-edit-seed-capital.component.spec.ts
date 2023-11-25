import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSeedCapitalComponent } from './create-edit-seed-capital.component';

describe('CreateEditSeedCapitalComponent', () => {
  let component: CreateEditSeedCapitalComponent;
  let fixture: ComponentFixture<CreateEditSeedCapitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditSeedCapitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditSeedCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
