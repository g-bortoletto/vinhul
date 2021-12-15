import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedUser$: BehaviorSubject<User> = new BehaviorSubject({} as User);

  constructor() {}

  login(email: string, password: string) {
    console.log(email);
    console.log(password);
  }

  signup(name: string, email: string, password: string) {
    console.log(name);
    console.log(email);
    console.log(password);
  }

  logout() {
    console.log('logout');
  }

  isLoggedIn() {
    return !!this.loggedUser$.getValue();
  }

  getLoggedUser() {
    return this.loggedUser$;
  }
}
