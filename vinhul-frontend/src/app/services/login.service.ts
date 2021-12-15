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
  logginError$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
    const authParams = localStorage.getItem('authParams');
    if (authParams) {
      this.loggedUser$.next(JSON.parse(authParams));
    }
  }

  login(email: string, password: string) {
    this.http
      .get<User[]>(`${environment.backendUrl}/users/getaccount`, {
        params: { email },
      })
      .subscribe((users) => {
        if (users.length > 0) {
          const user = users[0];

          if (user.password === password) {
            this.loggedUser$.next(user);
            this.logginError$.next('');
            localStorage.setItem('authParams', JSON.stringify(user));
          } else {
            this.logginError$.next("Senha incorreta");
          }
        } else {
          this.logginError$.next('Email ou senha incorretos');
        }
      });
  }

  signup(name: string, email: string, password: string) {
    const body = { name, email, password };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    this.http
      .post(`${environment.backendUrl}/users/createaccount`, body, httpOptions)
      .subscribe((user: any) => {
        if (user.result === 'OK') {
          this.loggedUser$.next(user.document);
          this.logginError$.next('');
          localStorage.setItem('authParams', JSON.stringify(user.document));
        } else {
          this.logginError$.next("Não foi possível criar a conta");
        }
      });
  }

  logout() {
    this.loggedUser$.next({} as User);
    this.logginError$.next('');
    localStorage.removeItem('authParams');
  }

  isLoggedIn() {
    return this.loggedUser$.getValue().email !== undefined;
  }

  getLoggedUser() {
    return this.loggedUser$;
  }

  getLogginError() {
    return this.logginError$;
  }
}
