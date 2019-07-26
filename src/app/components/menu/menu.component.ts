import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';

const { version: appVersion } = require('../../../../package.json')

@Component({
  selector: 'main-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public appVersion;

  constructor(
    public authService: AuthService,
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
    };
    options[option]();
  }
}
