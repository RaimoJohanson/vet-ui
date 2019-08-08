import { NgModule } from '@angular/core';
import { SharedModule } from '@app/modules/shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';

import { SettingsComponent } from './settings.component';
import { UserSettingsComponent } from './containers/user-settings/user-settings.component';
import { SecuritySettingsComponent } from './containers/security-settings/security-settings.component';
import { AuthService } from '@app/services/authentication/auth.service';
import { ProfileImageComponent } from './components/profile-image/profile-image.component';
import { SettingsFacadeService } from './settings-facade.service';


@NgModule({
  declarations: [
    SettingsComponent,
    UserSettingsComponent,
    SecuritySettingsComponent,
    ProfileImageComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
  ],
  providers: [
    SettingsFacadeService,
  ],
  bootstrap: [SettingsComponent],
})
export class SettingsModule { }
