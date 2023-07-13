import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InterceptServiceService implements HttpInterceptor {
  constructor(private authService: AuthServiceService) { }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.authService.getToken()
    const api_url = this.authService.getApiUrl();
    // concat method name with API url
    const request_url = api_url + httpRequest.url;

    if (this.authService.isLoggedIn()) {
      httpRequest = httpRequest.clone({
        url: request_url,
        setHeaders: {
          Authorization: `Bearer ${jwt}`,
          ismasking: `true`,
        }
      });
    } else {
      httpRequest = httpRequest.clone({
        url: request_url
      });
    }



    return next.handle(httpRequest);
  }
}
