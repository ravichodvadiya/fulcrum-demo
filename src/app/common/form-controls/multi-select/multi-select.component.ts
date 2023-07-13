import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent {
  @Input() field: any;
  @Input() filterForm: any;
  @Input() options: any;
}
