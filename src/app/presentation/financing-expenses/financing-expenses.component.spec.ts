import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingExpensesComponent } from './financing-expenses.component';

describe('FinancingExpensesComponent', () => {
  let component: FinancingExpensesComponent;
  let fixture: ComponentFixture<FinancingExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancingExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
