import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
  }

  getToken() {
    return localStorage.getItem("token")
  }

  isLoggedIn() {
    if (localStorage.getItem('token') == 'undefined') {
      return false;
    } else {
      return !!localStorage.getItem('token');
    }
  }

  getApiUrl() {
    return environment.apiURL
  }

  getQueryparams(data: any) {
    return '?' + new URLSearchParams(data).toString();
  }
  
}
