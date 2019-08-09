import { Component, OnInit } from '@angular/core';
import { SettingsFacadeService } from '../../settings-facade.service';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'upload-profile-image',
  templateUrl: 'upload-profile-image.component.html',
  styleUrls: ['upload-profile-image.component.scss'],
})
export class UploadProfileImageComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<UploadProfileImageComponent>,
    ) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
