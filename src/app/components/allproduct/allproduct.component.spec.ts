/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllproductComponent } from './allproduct.component';

describe('AllproductComponent', () => {
  let component: AllproductComponent;
  let fixture: ComponentFixture<AllproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
