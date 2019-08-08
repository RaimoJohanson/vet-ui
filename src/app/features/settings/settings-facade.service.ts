import { Injectable } from '@angular/core';
import { AuthService, UserProfile } from '@app/services/authentication/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class SettingsFacadeService {
  public profileForm: FormGroup;
  public securityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.profileForm = this.generateUserForm(this.authService.profile);
    this.securityForm = this.generateSecurityForm();
  }

  public submitUserSettings(form) {
    try {
      console.log(form);
      // 1. Api call
      // 2. Update store;
      const account = form.value;

      this.authService.profile = account;
    } catch (error) {
      console.log(error);
    }
  }

  public submitSecuritySettings(form) {
    console.log(form.value);
  }

  public uploadProfileImage(form) {
    try {
      console.log(form);
      // 1. Api call
      // 2. Update store;
    } catch (error) {
      console.log(error);
    }
  }

  private generateUserForm(profile: UserProfile): FormGroup {
    return this.fb.group({
      first_name: [`${profile.first_name}`],
      last_name: [`${profile.last_name}`],
      profession: [`${profile.profession || 'Loomaarst'}`],
      email: [profile.email],
    });
  }
  private generateSecurityForm() {
    return this.fb.group({
      password: [''],
      passwordcheck: [''],
    });
  }
}
