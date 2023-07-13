import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  @Input() config: any;
  @Input() options: any;
  @Output() filter: EventEmitter<any> = new EventEmitter();
  public filterForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.filterForm.reset();
    this.config?.fields.forEach((field: any) => {
      this.filterForm.addControl(field?.field, new FormControl({ value: field.value, disabled: this.config?.disabled ? this.config?.disabled : field?.disabled }));
    });
  }

  createEvent() {
    if (this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }
    if (this.config) {
      this.config.createAction(this.filterForm.getRawValue(),"next");
    }
  }

  previous() {
    if (this.config) {
      this.config.createAction(this.filterForm.getRawValue(),"pre");
    }
  }

}
