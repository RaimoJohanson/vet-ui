import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AUTH_API_URL } from '@app/config';

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profession?: string;
}

export interface CurrentUser {
  account: UserProfile;
  token: string;
}

@Injectable()
export class AuthService {
  private profileSubject: BehaviorSubject<UserProfile>;
  private currentUserSubject: BehaviorSubject<CurrentUser>;

  public currentUser: Observable<CurrentUser>;
  public profile$: Observable<UserProfile>;

  constructor(public http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    this.currentUserSubject = new BehaviorSubject<CurrentUser>(user);
    this.currentUser = this.currentUserSubject.asObservable();

    this.profileSubject = new BehaviorSubject<UserProfile>(user.account);
    this.profile$ = this.profileSubject.asObservable();
  }

  public get currentUserValue(): CurrentUser {
    return this.currentUserSubject.value;
  }

  public get profile(): UserProfile {
    return this.profileSubject.value;
  }

  public set profile(profile: UserProfile) {
    this.profileSubject.next(profile);
  }

  login(email: string, password: string) {
    return this.http.post<CurrentUser>(`${AUTH_API_URL}/login`, { email, password })
      .pipe(map((res) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
          // store user details and jwt token in local storage
          // to keep user logged in between page refreshes
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

  updateUserProfile(updated) {
    return;
    const url = '';
    return this.http.put(url, updated).toPromise();
  }
}
