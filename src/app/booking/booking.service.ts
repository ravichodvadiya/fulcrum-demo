import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const token: any = localStorage.getItem("token")
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private apiUrl = "https://beta-b.wj-fulcrum.co.uk/apiv1"

  constructor(private http: HttpClient) { }

  getScopePackage(booking_id: any, scope_package_id: any) {
    return this.http.get(`${this.apiUrl}/booking/wizard/select_scope_package?booking_id=${booking_id}&scope_package_id=${scope_package_id}`, { headers: headers });
  }

  createScopePackage(body: any) {
    return this.http.post(`${this.apiUrl}/booking/wizard/select_scope_package`, body, { headers: headers });
  }

  getBasicInfo(booking_id: any, scope_package_id: any) {
    return this.http.get(`${this.apiUrl}/booking/wizard/basic_info?booking_id=${booking_id}&scope_package_id=${scope_package_id}`, { headers: headers });
  }

  getzones(body: any) {
    return this.http.post(`${this.apiUrl}/booking/wizard/cmd/get.zones.info`, body, { headers: headers });
  }

  createBasicInfo(body: any) {
    return this.http.post(`${this.apiUrl}/booking/wizard/basic_info`, body, { headers: headers });
  }

  getVehicleAndDriver(booking_id: any) {
    return this.http.get(`${this.apiUrl}/booking/wizard/vehicle_and_driver?booking_id=${booking_id}`, { headers: headers });
  }

  createVehicleAndDriver(body: any) {
    return this.http.post(`${this.apiUrl}/booking/wizard/vehicle_and_driver`, body, { headers: headers });
  }
  

}
