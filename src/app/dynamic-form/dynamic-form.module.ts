import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { TextInputComponent } from './fields/text-input/text-input.component';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { DropdownSelectComponent } from './fields/dropdown-select/dropdown-select.component';
import {MatSelectModule} from "@angular/material/select";
import { ImageUploadComponent } from './fields/image-upload/image-upload.component';
import {DatePickerInputAdminComponent} from "./fields/date-picker-input-admin/date-picker-input-admin.component";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";



@NgModule({
  declarations: [
    FormBuilderComponent,
    TextInputComponent,
    DropdownSelectComponent,
    ImageUploadComponent,
    DatePickerInputAdminComponent
  ],
  exports: [
    FormBuilderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
  ]
})
export class DynamicFormModule { }
