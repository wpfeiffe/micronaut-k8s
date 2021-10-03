import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule, ClrIconModule } from "@clr/angular";

import { DepartmentEditComponent } from './department-edit.component';

describe('DepartmentEditComponent', () => {
  let component: DepartmentEditComponent;
  let fixture: ComponentFixture<DepartmentEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
