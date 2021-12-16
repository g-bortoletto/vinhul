import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User, Wine } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CadastrarService {
  cadastrarError$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  cadastraVinho(
    name: string,
    origin: string,
    type: string,
    grapetype: string,
    foodharmony: string,
    image: string
  ) {
    const body: Wine = {
      name: name,
      origin: origin,
      type: type,
      grapetype: grapetype,
      foodharmony: foodharmony,
      image: image,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    this.http
      .post(`${environment.backendUrl}/wine/createwine`, body, httpOptions)
      .subscribe((wine: any) => {
        console.log(wine);
      });
  }
}
