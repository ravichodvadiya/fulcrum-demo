import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
  @Input() field: any;
  @Input() filterForm: any;
  @Input() options: any;
}
