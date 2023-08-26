import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryshoppingComponent } from './categoryshopping.component';

describe('CategoryshoppingComponent', () => {
  let component: CategoryshoppingComponent;
  let fixture: ComponentFixture<CategoryshoppingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryshoppingComponent]
    });
    fixture = TestBed.createComponent(CategoryshoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
