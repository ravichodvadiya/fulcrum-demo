import { NgModule } from '@angular/core';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { FormsComponent } from '../common/form-controls/forms/forms.component';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlsModule } from '../common/form-controls/form-controls.module';
import { ScopePackageComponent } from './scope-package/scope-package.component';
import { BasicInformationComponent } from './basic-information/basic-information.component';
import { VehicleAndDriverSelectionComponent } from './vehicle-and-driver-selection/vehicle-and-driver-selection.component';


@NgModule({
  declarations: [
    BookingFormComponent,
    ScopePackageComponent,
    BasicInformationComponent,
    VehicleAndDriverSelectionComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlsModule
  ]
})
export class BookingModule { }
