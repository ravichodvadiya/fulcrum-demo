import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../authentication-class.model';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public subscription!: Subscription
  public loginModel: LoginModel = {
    email: "",
    password: ""
  }
  public formConfig: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,    
    private authService :AuthServiceService
  ) {}

  ngOnInit(): void {
    this.authService.clearStorage();
    this.formConfig = {
      title: "Login",
      action: '',
      fields: [
        { field: 'email', label: 'Email', type: 'text', validators: [], hidden: false, required: true },
        { field: 'password', label: 'Password', type: 'password', validators: [], hidden: false, required: true },
      ],
      isSingleButton: true,
      buttonText:"Login",
      createAction: (formData: any) => this.login(formData),
    }
  }

  login(formData: LoginModel): void {
    this.subscription = this.authenticationService.login(formData).subscribe((data: any) => {
      localStorage.setItem("token", data?.data?.access_token)
      this.router.navigate(['/booking']);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
