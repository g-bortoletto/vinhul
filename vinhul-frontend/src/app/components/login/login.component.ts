import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.logout();

    this.loginService.getLoggedUser().subscribe((user) => {
      if (!user.email) return;
      this.router.navigate(['/']);
    });

    this.loginService.logginError$.subscribe((error) => {
      if (error) {
        alert(error);
      }
    });
  }

  onLogin() {
    this.loginService.login(this.loginEmail, this.loginPassword);
  }

  onSignup() {
    this.loginService.signup(
      this.signupName,
      this.signupEmail,
      this.signupPassword
    );
  }
}
