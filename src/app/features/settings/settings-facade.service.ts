import { Injectable } from '@angular/core';
import { AuthService, UserProfile } from '@app/services/authentication/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { UploadProfileImageComponent } from './components/upload-profile-image/upload-profile-image.component';

@Injectable()
export class SettingsFacadeService {
  public profileForm: FormGroup;
  public securityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
  ) {
    this.profileForm = this.generateUserForm(this.authService.profile);
    this.securityForm = this.generateSecurityForm();
  }

  public submitUserSettings(form: FormGroup) {
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

  public submitSecuritySettings(form: FormGroup) {
    console.log(form);
    if (form.controls.newPassword.errors
      && form.controls.newPassword.errors.mismatch) {
      this.snackbar.open('Salasõnad ei ühti', null, { duration: 200000 });
    }
    // proceed;
  }

  public uploadProfileImage() {
    this.bottomSheet.open(UploadProfileImageComponent);
  }

  private generateUserForm(profile: UserProfile): FormGroup {
    return this.fb.group({
      first_name: [`${profile.first_name}`],
      last_name: [`${profile.last_name}`],
      profession: [`${profile.profession || 'Loomaarst'}`],
      email: [profile.email],
    });
  }

  private checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirm').value;
    return pass === confirmPass ? null : { mismatch: true };
  }

  private generateSecurityForm() {
    return this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: this.fb.group(
        { password: ['', Validators.required], confirm: ['', Validators.required] },
        { validator: this.checkPasswords }),
    });
  }
}
