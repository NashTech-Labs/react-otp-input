import { Component, OnInit } from '@angular/core';
import {FIELD_TYPE, FIELD_WIDTH, FormFieldModel} from "../../dynamic-form/form-builder/form-builder.component";
import {Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EmailExistsValidator} from "../../services/email-exists-validator";

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  fields: FormFieldModel[] = [
    {
      config: {
        label: 'Profile image',
        acceptedFileTypes: ['.png', '.jpeg', '.jpg'],
        styles: {width: '120px', height: '120px'}
      },
      fieldType: FIELD_TYPE.IMAGE_UPLOAD,
      formControlConfig: {name: 'profileImage', value: null, validations: []}
    },{
      fieldType: FIELD_TYPE.INPUT,
      config: {label: 'Username', placeholder: 'Create a unique username', errors: {required: 'Please enter a unique username', usernameExists: 'This username is taken'}, showStatusCheck: true},
      formControlConfig: {
        name: 'username',
        validations: [Validators.required],
        asyncValidations: [EmailExistsValidator.createValidator()],
        value: ''
      },
    },
  ];
  prefilledFormValues = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedBasicInfo = localStorage.getItem('userProfile');
    if(storedBasicInfo) {
      this.prefilledFormValues = JSON.parse(storedBasicInfo);
    }
  }

  onFormSubmit(event) {
    if (event.valid) {
      this.router.navigate(['/', 'complete-profile'])
    }
  }

  onFormClose(event) {
    const formValue = event.value;
    let reader = new FileReader();
    reader.readAsDataURL(formValue.profileImage);
    reader.onload = () => {
      let url = reader.result as string;
      localStorage.setItem('userProfile', JSON.stringify({...formValue, profileImage: url}));
    }
  }
}
