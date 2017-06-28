import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinedProjectResourceComponent } from './assined-project-resource.component';

describe('AssinedProjectResourceComponent', () => {
  let component: AssinedProjectResourceComponent;
  let fixture: ComponentFixture<AssinedProjectResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssinedProjectResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssinedProjectResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
