import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng.module';
import { FormControlsModule } from '../common/form-controls/form-controls.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    AuthenticationRoutingModule,
    FormControlsModule
  ]
})
export class AuthenticationModule { }
