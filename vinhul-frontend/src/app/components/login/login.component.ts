import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginEmail!: string;
  loginPassword!: string;
  signupName!: string;
  signupEmail!: string;
  signupPassword!: string;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  onLogin() {
    this.loginService.login(this.loginEmail, this.loginPassword);
  }

  onSignup() {
    this.loginService.signup(this.signupName, this.signupEmail, this.signupPassword);
  }
}
