import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from '@app/services/auth.service';
import { MatSnackBar } from '@angular/material';

const MESSAGES = {
  email_field: 'Email on puudu',
  password_field: 'Salasõna on puudu',
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public rememberMe = false;
  public localStorageCredentials;
  public email: string;
  public password: string;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public authService: AuthService,
    public snackBar: MatSnackBar
  ) {}
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }
  login(): void {
    if (!this.email) return this.openSnackBar(MESSAGES.email_field);
    if (!this.password) return this.openSnackBar(MESSAGES.password_field);

    if (this.rememberMe) {
      localStorage.setItem('rememberMe', JSON.stringify({ email: this.email, password: this.password }));
    } else {
      localStorage.removeItem('rememberMe');
    }
    
    this.authService.login(this.email, this.password).subscribe(data => {
      console.log(data);
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this.localStorageCredentials = JSON.parse(localStorage.getItem('rememberMe'));
    if (this.localStorageCredentials) {
      this.rememberMe = true;
      this.email = this.localStorageCredentials.email;
      this.password = this.localStorageCredentials.password;
    }
  }
}
