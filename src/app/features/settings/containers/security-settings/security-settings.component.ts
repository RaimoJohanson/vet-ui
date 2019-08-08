import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SettingsFacadeService } from '../../settings-facade.service';

@Component({
  selector: 'security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.scss'],
})
export class SecuritySettingsComponent {
  public form: FormGroup;

  constructor(public facade: SettingsFacadeService) {
    this.form = this.facade.securityForm;
  }
}
