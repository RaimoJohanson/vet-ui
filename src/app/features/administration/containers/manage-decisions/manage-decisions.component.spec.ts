import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDecisionsComponent } from './manage-decisions.component';

describe('ManageDecisionsComponent', () => {
  let component: ManageDecisionsComponent;
  let fixture: ComponentFixture<ManageDecisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDecisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDecisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
