import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyexpensesComponent } from './myexpenses.component';

describe('MyexpensesComponent', () => {
  let component: MyexpensesComponent;
  let fixture: ComponentFixture<MyexpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyexpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
