import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@app/models/user';
import { AUTH_API_URL } from '@app/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public currentUserSubject: BehaviorSubject<User>;
public currentUser: Observable<User>;

constructor(public http: HttpClient) {
this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
this.currentUser = this.currentUserSubject.asObservable();
}
public get currentUserValue(): User {
return this.currentUserSubject.value;
}

  login(email: string, password: string) {
      return this.http.post<any>(`${AUTH_API_URL}/login`, { email, password })
          .pipe(map(res => {
              // login successful if there's a jwt token in the response
              if (res && res.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(res));
                  this.currentUserSubject.next(res);
              }

              return res;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      location.reload();
  }
}