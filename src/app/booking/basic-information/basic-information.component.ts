import { Component, EventEmitter, Output, Input } from '@angular/core';
import { BookingService } from '../booking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent {
  @Input()
  otherData: any

  @Output() 
  createFn: EventEmitter<any> = new EventEmitter();
  public subscription!: Subscription
  public formConfig: any
  public booking_id: any = ""
  public scope_package_id: any = ""
  public options: any = {}
  public isStpper: boolean = false
  public items: any
  public activeIndex: number = 0
  public ZoneObj: any = {}

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.booking_id = this.otherData?.booking_id;
    this.scope_package_id = this.otherData?.scope_package_id;
    this.items = []
    this.getBasicInfo()
  }

  getBasicInfo() {
    const data = {
      booking_id: this.booking_id,
      scope_package_id: this.scope_package_id
    }
    this.subscription = this.bookingService.getBasicInfo(data).subscribe((data: any) => {
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

      this.formConfig = {
        title: data.data.form_field_config.title,
        action: '',
        fields: fields,
        isStpper: false,
        isSingleButton: false,
        buttonText:"Previous",
        buttonTextTwo:"Next",
        createAction: (formData: any,step: string) => this.createBasicInfo(formData, step),
      }

      if(this.otherData.step == 'pre'){
        const body = {
          scope_package: this.scope_package_id,
          booking_type: fields.find((field:any)=>field.field == 'booking_type_id').value,
          booking_id: ""
        }
        this.subscription = this.bookingService.getzones(body).subscribe((data: any) => {
          this.options["zone_id"] = data.data.zone_data.zones
        })
      }

    })
  }

  createBasicInfo(formData: any,step: string) {
    this.subscription = this.bookingService.createBasicInfo(formData).subscribe((data: any)=> {
      if (data.data.form_status == 1) {
        const resData ={
          data: data.data,
          step: step
        }
        this.createFn.emit(resData)
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

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
