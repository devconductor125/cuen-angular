import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnEditIncomeComponent } from './create-an-edit-income.component';

describe('CreateAnEditIncomeComponent', () => {
  let component: CreateAnEditIncomeComponent;
  let fixture: ComponentFixture<CreateAnEditIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAnEditIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnEditIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
