import { Component, OnInit } from '@angular/core'
import { BookingService } from '../booking.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  public subscription!: Subscription
  public booking_id: any = ""
  public scope_package_id: any = ""
  public scopeSelection: boolean = true
  public basicSelection: boolean = true
  public vehicleAndDriverSelection: boolean = true
  public formConfig: any
  public formConfigBasic: any
  public formConfigVehicleAndDriver: any
  public options: any = {}
  public ZoneObj: any = {}
  public isStpper: boolean = false
  public items: any
  public activeIndex: number = 0

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.items = []
    this.getScoprPackage()
  }

  getScoprPackage() {
    this.subscription = this.bookingService.getScopePackage(this.booking_id, this.scope_package_id).subscribe((data: any) => {
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
          field: input.name, label: input.label, type: input.type, placeholder: input.placeholder, multiple: input.multiple, disabled: input.disabled,
          required: input.required, hidden: input.hidden, onChange: (event: any, name: any) => { }
        })
      })
      this.formConfig = {
        title: data.data.form_field_config.title,
        action: '',
        fields: fields,
        isStpper: false,
        createAction: (formData: any) => this.createScope(formData),
      }
    })
  }

  getBasicInfo(step:string) {
    // this.formConfigBasic = {}
    // this.formConfigVehicleAndDriver = {}
    this.subscription = this.bookingService.getBasicInfo(this.booking_id, this.scope_package_id).subscribe((data: any) => {
      this.formConfigBasic = data?.data
      const fields: any = []
      this.activeIndex = data.data.steps_summary.current
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
          required: input.required, options: input.options, hidden: input.hidden, value: input.value, onChange: (event: any, name: any) => {
            this.getSelectData(event, name)
          }
        })
      })
      ;
      this.formConfigBasic = {
        title: data.data.form_field_config.title,
        action: '',
        fields: fields,
        isStpper: false,
        createAction: (formData: any,step: string) => this.createBasicInfo(formData, step),
      }

    

      if(step == 'pre'){
        const body = {
          scope_package: this.scope_package_id,
          booking_type: fields.find((field:any)=>field.field == 'booking_type_id').value,
          booking_id: ""
        }
        this.subscription = this.bookingService.getzones(body).subscribe((data: any) => {
          this.options["zone_id"] = data.data.zone_data.zones
        })
        this.scopeSelection = false
        this.basicSelection = true
        this.vehicleAndDriverSelection = false
      }
    })
  }

  createScope(formData: any) {
    this.subscription = this.bookingService.createScopePackage(formData).subscribe((data: any) => {
      this.scope_package_id = formData.scope_package_id
      if (data.data.form_status == 1 && data.data.moving_direction == "NEXT") {
        this.scopeSelection = false
        this.basicSelection = true
        this.vehicleAndDriverSelection = false
        this.getBasicInfo('next')
      }
    })
  }

  createBasicInfo(formData: any,step: string) {
    let fields: any = []
    this.subscription = this.bookingService.createBasicInfo(formData).subscribe((data: any)=> {
      if (data.data.form_status == 1 && data.data.moving_direction == "NEXT") {
        this.booking_id = data.data.booking_data.id
        this.scopeSelection = false
        this.basicSelection = false
        this.vehicleAndDriverSelection = true
        if(data.data.steps_summary.total > 2) {
          this.activeIndex = data.data.steps_summary.next
          this.isStpper = true
          data.data.steps_summary.steps.forEach((element: any) => {
            fields.push( {
              ...element,
              label: element.name
            })
          })
          this.items = fields
        }
        this.getVehicleAndDriver()
      }

    })

  }

  getSelectData(event: any, name: any) {
    if (Object.keys(name))
      if (name == "scope_package_id" || name == "booking_type_id") {
        this.ZoneObj[name] = event.value
        if ( this.ZoneObj.hasOwnProperty('booking_type_id')) {
          const body = {
            scope_package: this.scope_package_id,
            booking_type: this.ZoneObj.booking_type_id,
            booking_id: ""
          }
          this.subscription = this.bookingService.getzones(body).subscribe((data: any) => {
            this.options["zone_id"] = data.data.zone_data.zones
          })
        }
      }
  }

  getVehicleAndDriver() {
    this.subscription = this.bookingService.getVehicleAndDriver(this.booking_id).subscribe((data: any) => {
      this.formConfigVehicleAndDriver = data?.data
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
      this.formConfigVehicleAndDriver = {
        title: data.data.form_field_config.title,
        action: '',
        fields: fields,
        isStpper: true,
        createAction: (formData: any,step: string) => this.createVehicleAndDriver(formData,step),
      }
    })
  }

  createVehicleAndDriver(formData: any, step: string) {
    // formData["booking_id"] = this.booking_id;
    // formData["submit_button"] = step;
    // formData["supplier_company"] = 270;
    // formData["fuel_type"] = 1;
    // formData["icon_mapping"] = 21;
    // formData["unknown_vehicle"] = true;
    // formData["place_of_origin"] = {
    //   longitude: -0.08773210000000001,
    //   latitude: 51.5078788,
    //   country: null,
    //   locality: null,
    //   neighborhood: null,
    //   administrative_area_level_1: "England",
    //   administrative_area_level_2: "Greater London",
    //   formatted_address: "London EC4R 9HA, UK",
    //   route: "Perkins Road",
    //   street_number: "33",
    //   postal_code: "IG2 7NQ",
    //   place_id: "ChIJxRO7WVEDdkgRrGM1fCYoHqY",
    //   country_abbreviation: "GB"
    // }


    const body =  {
      vehicle: formData["vehicle"],
      driver: formData["driver"],
      passenger_name: null,
      passenger_id: null,
      fuel_type: 1,
      icon_mapping: 21,
      unknown_vehicle: true,
      supplier_company: 270,
      vehicle_emission_category: formData["vehicle_emission_category"],
      zone_registration_map: null,
      place_of_origin: {
          longitude: -0.08773210000000001,
          latitude: 51.5078788,
          country: null,
          locality: null,
          neighborhood: null,
          administrative_area_level_1: "England",
          administrative_area_level_2: "Greater London",
          formatted_address: "London EC4R 9HA, UK",
          route: "Perkins Road",
          street_number: "33",
          postal_code: "IG2 7NQ",
          place_id: "ChIJxRO7WVEDdkgRrGM1fCYoHqY",
          country_abbreviation: "GB"
      },
      booking_id: this.booking_id.toString(),
      submit_button:step
  }
    
    this.subscription = this.bookingService.createVehicleAndDriver(body).subscribe((data: any)=> {
      // if (data.data.form_status == 1 && data.data.moving_direction == "NEXT") {
      //   this.booking_id = data.data.booking_data.id
      //   this.scopeSelection = false
      //   this.basicSelection = false
      //   this.vehicleAndDriverSelection = true
      //   
      //   if(data.data.steps_summary.total > 2) {
      //     this.activeIndex = data.data.steps_summary.next
      //     this.isStpper = true

      //     data.data.steps_summary.steps.forEach((element: any) => {
      //       fields.push( {
      //         ...element,
      //         label: element.name
      //       })
      //     })

      //     this.items = fields
      //   }
      // }
      if(step == "next") {
      
      } else {
        this.getBasicInfo(step)
      
      }
      
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


}
