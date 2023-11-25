import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFinancingExpensesComponent } from './create-financing-expenses.component';

describe('CreateFinancingExpensesComponent', () => {
  let component: CreateFinancingExpensesComponent;
  let fixture: ComponentFixture<CreateFinancingExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFinancingExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFinancingExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
