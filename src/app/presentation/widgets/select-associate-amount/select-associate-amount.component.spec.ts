import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAssociateAmountComponent } from './select-associate-amount.component';

describe('SelectAssociateAmountComponent', () => {
  let component: SelectAssociateAmountComponent;
  let fixture: ComponentFixture<SelectAssociateAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAssociateAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAssociateAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
