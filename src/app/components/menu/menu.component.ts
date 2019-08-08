import { Component, OnInit } from '@angular/core';
import { AuthService, UserProfile } from '@app/services/authentication/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

const { version: appVersion } = require('../../../../package.json');

@Component({
  selector: 'main-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  private subscription: Subscription;
  public appVersion: string;
  public profile: UserProfile;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.appVersion = appVersion;
  }

  isLoggedIn() {
    const currentUser = this.authService.currentUserValue;
    return !!currentUser;
  }
  logout() {
    this.authService.logout();
  }

  handleMenuClick(option) {
    const options = {
      frontpage: () => this.router.navigateByUrl('/'),
      logout: () => this.authService.logout(),
      admin: () => this.router.navigateByUrl('/admin/statistics'),
      settings: () => this.router.navigateByUrl('settings'),
    };
    options[option]();
  }

  ngOnInit() {
    this.subscription = this.authService.profile$
    .subscribe((profile: UserProfile) => this.profile = profile);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
