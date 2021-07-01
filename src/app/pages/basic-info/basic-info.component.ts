import {Component, OnInit} from '@angular/core';
import {Validators} from "@angular/forms";
import {FIELD_TYPE, FIELD_WIDTH, FormFieldModel} from "../../dynamic-form/form-builder/form-builder.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  fields: FormFieldModel[] = [
    {
      fieldType: FIELD_TYPE.INPUT,
      config: {label: 'First name', placeholder: 'Enter your first name', errors: {required: 'Please enter your name'}},
      formControlConfig: {
        name: 'firstName',
        validations: [Validators.required],
        value: ''
      },
      fieldWidth: FIELD_WIDTH.COL_2
    },{
      fieldType: FIELD_TYPE.INPUT,
      config: {label: 'Last name', placeholder: 'Enter your last name'},
      formControlConfig: {
        name: 'lastName',
        validations: [],
        value: ''
      },
      fieldWidth: FIELD_WIDTH.COL_2
    },{
      fieldType: FIELD_TYPE.INPUT,
      config: {label: 'Email', placeholder: 'Enter your email',type: 'email' , errors: {required: 'Please enter your email',email: 'Not a valid email format'}},
      formControlConfig: {
        name: 'input',
        validations: [Validators.required, Validators.email],
        value: ''
      },
    },
  ];
  prefilledFormValues = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedBasicInfo = localStorage.getItem('basicInfo');
    if(storedBasicInfo) {
      this.prefilledFormValues = JSON.parse(storedBasicInfo);
    }
  }

  onFormSubmit(event) {
    if (event.valid) {
      localStorage.setItem('basicInfo', JSON.stringify(event.value));
      this.router.navigate(['/', 'create-profile'])
    }
  }

}
