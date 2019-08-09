import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProfileImageComponent } from './upload-profile-image.component';

describe('UploadProfileImageComponent', () => {
  let component: UploadProfileImageComponent;
  let fixture: ComponentFixture<UploadProfileImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProfileImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
