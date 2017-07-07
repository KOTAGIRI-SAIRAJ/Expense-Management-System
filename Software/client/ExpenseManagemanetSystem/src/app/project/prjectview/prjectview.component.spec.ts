import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjectviewComponent } from './prjectview.component';

describe('PrjectviewComponent', () => {
  let component: PrjectviewComponent;
  let fixture: ComponentFixture<PrjectviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjectviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjectviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
