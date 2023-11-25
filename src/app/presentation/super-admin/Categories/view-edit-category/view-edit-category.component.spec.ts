import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditCategoryComponent } from './view-edit-category.component';

describe('ViewEditCategoryComponent', () => {
  let component: ViewEditCategoryComponent;
  let fixture: ComponentFixture<ViewEditCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
