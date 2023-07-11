import { NgModule } from '@angular/core';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { FormsComponent } from '../common/forms/forms.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookingFormComponent,
    FormsComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BookingModule { }
