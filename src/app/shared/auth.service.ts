import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = new BehaviorSubject(false);
  userNameView = this.localStorageUserNameView || 'Your Name';

  constructor(private router: Router) {
    if (localStorage.getItem('userData')) {
      this.isLogin.next(true);
    }
  }

  get localStorageUserNameView() {
    return localStorage.getItem('userData')?.split('$')[0];
  }

  login(userName: string, password: string) {
    const token = userName + '$' + password;
    localStorage.setItem('userData', token);
    this.isLogin.next(true);
    this.router.navigate(['/posts']);
    this.userNameView = userName;
  }

  logout() {
    localStorage.removeItem('userData');
    this.isLogin.next(false);
    this.router.navigate(['/login']);
    this.userNameView = 'Your Name';
  }
}
