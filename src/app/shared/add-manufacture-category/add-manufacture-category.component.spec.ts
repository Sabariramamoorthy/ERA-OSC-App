import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManufactureCategoryComponent } from './add-manufacture-category.component';

describe('AddManufactureCategoryComponent', () => {
  let component: AddManufactureCategoryComponent;
  let fixture: ComponentFixture<AddManufactureCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddManufactureCategoryComponent]
    });
    fixture = TestBed.createComponent(AddManufactureCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
