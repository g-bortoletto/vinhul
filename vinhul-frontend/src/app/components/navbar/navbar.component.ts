import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  login$: Observable<User>;

  constructor(private loginService: LoginService) {
    this.login$ = this.loginService.getLoggedUser();
  }

  ngOnInit(): void {}
}
