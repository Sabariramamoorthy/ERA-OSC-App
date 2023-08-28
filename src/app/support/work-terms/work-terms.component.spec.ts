import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTermsComponent } from './work-terms.component';

describe('WorkTermsComponent', () => {
  let component: WorkTermsComponent;
  let fixture: ComponentFixture<WorkTermsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkTermsComponent]
    });
    fixture = TestBed.createComponent(WorkTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
