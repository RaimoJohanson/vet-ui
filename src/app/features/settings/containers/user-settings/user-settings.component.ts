import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SettingsFacadeService } from '../../settings-facade.service';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  public profileForm: FormGroup;
  public profileImageUrl: string = 'https://material.angular.io/assets/img/examples/shiba1.jpg';

  constructor(public facade: SettingsFacadeService) {
    this.profileForm = this.facade.profileForm;
  }

  ngOnInit() {}
}
