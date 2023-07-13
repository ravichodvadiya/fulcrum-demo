import { Injectable } from '@angular/core';
import { LoginModel } from './authentication-class.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(loginModel: LoginModel) {
    return this.http.post<any>(`/login`, loginModel);
  }
}
