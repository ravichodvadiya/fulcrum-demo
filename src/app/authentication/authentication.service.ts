import { Injectable } from '@angular/core';
import { LoginModel } from './authentication-class.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = "https://beta-b.wj-fulcrum.co.uk/apiv1"


  constructor(private http: HttpClient) { }

  login(loginModel: LoginModel) {
    return this.http.post(`${this.apiUrl}/login`, loginModel);
  }
}
