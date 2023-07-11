import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../authentication-class.model';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginModel: LoginModel = {
    email: "",
    password: ""
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,    
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.authenticationService.login(this.loginModel).subscribe((data: any) => {
      localStorage.setItem("token", data?.data?.access_token)
      this.router.navigate(['/booking']);
    })
  }
}
