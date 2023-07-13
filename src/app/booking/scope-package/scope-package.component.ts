import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-scope-package',
  templateUrl: './scope-package.component.html',
  styleUrls: ['./scope-package.component.scss']
})
export class ScopePackageComponent implements OnInit {
  @Output() 
  createFn: EventEmitter<any> = new EventEmitter();

  @Input()
  otherData: any

  public subscription!: Subscription
  public formConfig: any
  public booking_id: any = ""
  public scope_package_id: any = ""
  public options: any = {}
  public isStpper: boolean = false
  public items: any
  public activeIndex: number = 0

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.booking_id = this.otherData?.booking_id;
    this.scope_package_id = this.otherData?.scope_package_id;
    this.items = []
    this.getScopePackage()
  }

  getScopePackage() {
    const data = {
      booking_id: this.booking_id,
      scope_package_id: this.scope_package_id
    }
    this.subscription = this.bookingService.getScopePackage(data).subscribe((data: any) => {
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
        isSingleButton: false,
        buttonText:"Previous",
        buttonTextTwo:"Next",
        createAction: (formData: any,step: string) => this.createScope(formData, step),
      }
    })
  }

  createScope(formData: any,step: string) {
    this.subscription = this.bookingService.createScopePackage(formData).subscribe((data: any) => {
      this.scope_package_id = formData.scope_package_id
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
