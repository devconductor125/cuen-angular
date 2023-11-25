import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContributorComponent } from './create-contributor.component';

describe('CreateContributorComponent', () => {
  let component: CreateContributorComponent;
  let fixture: ComponentFixture<CreateContributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
