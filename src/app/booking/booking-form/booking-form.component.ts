import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  public booking_id: any = ""
  public scope_package_id: any = ""
  public currentStep: string = "select_scope_package"
  public isStpper: boolean = false
  public items: any
  public activeIndex: number = 0
  public otherData: any = {}

  constructor() { }

  ngOnInit(): void {
    this.items = []
  }

  createFn(objRes: any) {
    const data = objRes.data;
    debugger
    if (data.form_status == 1) {
      if (data.steps_summary.currentStep.system_name == "vehicle_and_driver") {
        if (objRes.step == "pre") {
          if (data.steps_summary.currentStep.system_name != "select_scope_package" && data.steps_summary.currentStep.system_name != "basic_info") {
            this.scope_package_id = data.booking_data.scope_package_id
          } else {
            this.scope_package_id = data.form_data.scope_package_id
          }
          this.booking_id = data?.booking_data?.id
          this.otherData["scope_package_id"] = this.scope_package_id
          this.otherData["booking_id"] = this.booking_id
          this.otherData["step"] = objRes.step
          this.currentStep = data.steps_summary.previousStep.system_name
          this.activeIndex = data.steps_summary.previousStep.step
          if (data.steps_summary.total > 2) {
            let fields: any = []
            this.isStpper = true
            data.steps_summary.steps.forEach((element: any) => {
              fields.push({
                ...element,
                label: element.name
              })
            })
            this.items = fields
          }
        }
        else {
          if (data.steps_summary.currentStep.system_name != "select_scope_package" && data.steps_summary.currentStep.system_name != "basic_info") {
            this.scope_package_id = data.booking_data.scope_package_id
          } else {
            this.scope_package_id = data.form_data.scope_package_id
          }
          this.booking_id = data?.booking_data?.id
          this.otherData["scope_package_id"] = this.scope_package_id
          this.otherData["booking_id"] = this.booking_id
          this.otherData["step"] = objRes.step
          this.currentStep = data.steps_summary.nextStep.system_name
          this.activeIndex = data.steps_summary.nextStep.step
          if (data.steps_summary.total > 2) {
            let fields: any = []
            this.isStpper = true
            data.steps_summary.steps.forEach((element: any) => {
              fields.push({
                ...element,
                label: element.name
              })
            })
            this.items = fields
          }
        }

      }
      else {
        if (data.moving_direction == "NEXT") {
          if (data.steps_summary.currentStep.system_name != "select_scope_package" && data.steps_summary.currentStep.system_name != "basic_info") {
            this.scope_package_id = data.booking_data.scope_package_id
          } else {
            this.scope_package_id = data.form_data.scope_package_id
          }
          this.booking_id = data?.booking_data?.id
          this.otherData["scope_package_id"] = this.scope_package_id
          this.otherData["booking_id"] = this.booking_id
          this.otherData["step"] = objRes.step
          this.currentStep = data.steps_summary.nextStep.system_name
          this.activeIndex = data.steps_summary.nextStep.step
          if (data.steps_summary.total > 2) {
            let fields: any = []
            this.isStpper = true
            data.steps_summary.steps.forEach((element: any) => {
              fields.push({
                ...element,
                label: element.name
              })
            })
            this.items = fields
          }
        } else if (data.moving_direction == "PREVIOUS") {
          if (data.steps_summary.currentStep.system_name != "select_scope_package" && data.steps_summary.currentStep.system_name != "basic_info") {
            this.scope_package_id = data.booking_data.scope_package_id
          } else {
            this.scope_package_id = data.form_data.scope_package_id
          }
          this.booking_id = data?.booking_data?.id
          this.otherData["scope_package_id"] = this.scope_package_id
          this.otherData["booking_id"] = this.booking_id
          this.otherData["step"] = objRes.step
          this.currentStep = data.steps_summary.previousStep.system_name
          this.activeIndex = data.steps_summary.previousStep.step
          if (data.steps_summary.total > 2) {
            let fields: any = []
            this.isStpper = true
            data.steps_summary.steps.forEach((element: any) => {
              fields.push({
                ...element,
                label: element.name
              })
            })
            this.items = fields
          }
        }
      }
    }
  }

}
