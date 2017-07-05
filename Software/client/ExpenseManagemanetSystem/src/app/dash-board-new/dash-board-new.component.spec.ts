import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardNewComponent } from './dash-board-new.component';

describe('DashBoardNewComponent', () => {
  let component: DashBoardNewComponent;
  let fixture: ComponentFixture<DashBoardNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
