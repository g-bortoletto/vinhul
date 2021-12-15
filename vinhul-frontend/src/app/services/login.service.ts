import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedUser$: BehaviorSubject<User> = new BehaviorSubject({} as User);

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    this.http
      .get<User>(`${environment.backendUrl}/getaccount`, { params: { email } })
      .subscribe(
        (user) => {
          console.log(user);
        }
      );
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
