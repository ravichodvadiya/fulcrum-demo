import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

const token: any = localStorage.getItem("token")
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

@Injectable({
  providedIn: 'root'
})

export class BookingService {

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
    ) { }

  getScopePackage(data: any) {
    return this.http.get(`/booking/wizard/select_scope_package${this.authService.getQueryparams(data)}`);
  }

  createScopePackage(body: any) {
    return this.http.post(`/booking/wizard/select_scope_package`, body);
  }

  getBasicInfo(data: any) {
    return this.http.get(`/booking/wizard/basic_info${this.authService.getQueryparams(data)}`);
  }

  getzones(body: any) {
    return this.http.post(`/booking/wizard/cmd/get.zones.info`, body);
  }

  createBasicInfo(body: any) {
    return this.http.post(`/booking/wizard/basic_info`, body);
  }

  getVehicleAndDriver(data: any) {
    return this.http.get(`/booking/wizard/vehicle_and_driver${this.authService.getQueryparams(data)}`);
  }

  createVehicleAndDriver(body: any) {
    return this.http.post(`/booking/wizard/vehicle_and_driver`, body);
  }
  

}
