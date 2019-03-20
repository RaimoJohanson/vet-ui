import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'main-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(
    public authService: AuthService
  ) {}

  isLoggedIn() {
    const currentUser = this.authService.currentUserValue;
    return !!currentUser;
  }
  logout() {
    this.authService.logout();
  }

}
