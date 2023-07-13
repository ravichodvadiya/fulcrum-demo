import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-vehicle-and-driver-selection',
  templateUrl: './vehicle-and-driver-selection.component.html',
  styleUrls: ['./vehicle-and-driver-selection.component.scss']
})
export class VehicleAndDriverSelectionComponent {
  @Input()
  otherData: any

  @Output() 
  createFn: EventEmitter<any> = new EventEmitter();
  public subscription!: Subscription
  public formConfig: any
  public booking_id: any = ""
  public scope_package_id: any = ""
  public options: any = {}

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.booking_id = this.otherData?.booking_id;
    this.scope_package_id = this.otherData?.scope_package_id;
    this.getVehicleAndDriver();
  }

  getVehicleAndDriver() {
    const data = {
      booking_id: this.booking_id
    }
    this.subscription = this.bookingService.getVehicleAndDriver(data).subscribe((data: any) => {
      this.formConfig = data?.data
      let fields: any = []
      data.data.form_field_config.elements.forEach((element: any) => {
        let input = element.input
        delete element.input
        delete element.name
        if (input.type) {
          this.options[input.name] = input.options
        }
        fields.push({
          ...element,
          field: input.name, label: element.title, type: input.type, placeholder: input.placeholder, multiple: input.multiple, disabled: input.disabled,
          required: input.required, options: input.options, hidden: input.hidden, value: input.value, onChange: (event: any, name: any) => {}
        })
      })
      this.formConfig = {
        title: data.data.form_field_config.title,
        action: '',
        fields: fields,
        isStpper: true,
        isSingleButton: false,
        buttonText:"Previous",
        buttonTextTwo:"Next",
        createAction: (formData: any,step: string) => this.createVehicleAndDriver(formData,step),
      }
    })
  }

  createVehicleAndDriver(formData: any, step: string) {
  //   const body =  {
  //     vehicle: formData["vehicle"],
  //     driver: formData["driver"],
  //     passenger_name: null,
  //     passenger_id: null,
  //     fuel_type: 1,
  //     icon_mapping: 21,
  //     unknown_vehicle: true,
  //     supplier_company: 270,
  //     vehicle_emission_category: formData["vehicle_emission_category"],
  //     zone_registration_map: null,
  //     place_of_origin: {
  //         longitude: -0.08773210000000001,
  //         latitude: 51.5078788,
  //         country: null,
  //         locality: null,
  //         neighborhood: null,
  //         administrative_area_level_1: "England",
  //         administrative_area_level_2: "Greater London",
  //         formatted_address: "London EC4R 9HA, UK",
  //         route: "Perkins Road",
  //         street_number: "33",
  //         postal_code: "IG2 7NQ",
  //         place_id: "ChIJxRO7WVEDdkgRrGM1fCYoHqY",
  //         country_abbreviation: "GB"
  //     },
  //     booking_id: this.booking_id.toString(),
  //     submit_button:step
  // }

  const body =  {
    "vehicle": 3879,
    "driver": 3477,
    "passenger_name": null,
    "passenger_id": null,
    "fuel_type": 1,
    "icon_mapping": 21,
    "unknown_vehicle": true,
    "supplier_company": 270,
    "vehicle_emission_category": [
        7
    ],
    "zone_registration_map": null,
    "place_of_origin": {
        "longitude": -0.08773210000000001,
        "latitude": 51.5078788,
        "country": null,
        "locality": null,
        "neighborhood": null,
        "administrative_area_level_1": "England",
        "administrative_area_level_2": "Greater London",
        "formatted_address": "London EC4R 9HA, UK",
        "route": "Perkins Road",
        "street_number": "33",
        "postal_code": "IG2 7NQ",
        "place_id": "ChIJxRO7WVEDdkgRrGM1fCYoHqY",
        "country_abbreviation": "GB"
    },
    "booking_id": "2139012",
    "submit_button": step
}
    
    this.subscription = this.bookingService.createVehicleAndDriver(body).subscribe((data: any)=> {
      if (data.data.form_status == 1) {
        const resData ={
          data: data.data,
          step: step
        }
        this.createFn.emit(resData)
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
