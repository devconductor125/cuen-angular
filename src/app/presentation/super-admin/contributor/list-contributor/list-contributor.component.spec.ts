import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContributorComponent } from './list-contributor.component';

describe('ListContributorComponent', () => {
  let component: ListContributorComponent;
  let fixture: ComponentFixture<ListContributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
