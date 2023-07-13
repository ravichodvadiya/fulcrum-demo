import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsComponent } from './forms/forms.component';
import { PrimengModule } from 'src/app/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { PasswordComponent } from './password/password.component';



@NgModule({
  declarations: [
    FormsComponent,
    InputComponent,
    SelectComponent,
    MultiSelectComponent,
    CheckboxComponent,
    RadioComponent,
    PasswordComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    PrimengModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsComponent,
    InputComponent
  ]
})
export class FormControlsModule { }
