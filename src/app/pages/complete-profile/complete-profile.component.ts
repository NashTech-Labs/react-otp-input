import { Component, OnInit } from '@angular/core';
import {FIELD_TYPE, FORM_LAYOUT, FormFieldModel} from "../../dynamic-form/form-builder/form-builder.component";
import {Router} from "@angular/router";
import {Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  formLayout = FORM_LAYOUT.COL_2
  fields: FormFieldModel[] = [
    {
      config: {
        label: 'Birthdate'
      },
      fieldType: FIELD_TYPE.DATE_PICKER,
      formControlConfig: {name: 'birthdate', value: null, validations: []}
    },{
      config: {
        label: 'Gender',
        placeholder: 'Select...',
        options: [{value: 'male', name: 'Male'}, {value: 'female', name: 'Female'},{value: 'other', name: 'Other'}, ]
      },
      fieldType: FIELD_TYPE.DROPDOWN_SELECT,
      formControlConfig: {name: 'gender', value: '', validations: []},
    },{
      config: {
        label: 'Marital status',
        placeholder: 'Select...',
        options: [{value: 'bachelor', name: 'bachelor'}, {value: 'married', name: 'Married'} ]
      },
      fieldType: FIELD_TYPE.DROPDOWN_SELECT,
      formControlConfig: {name: 'maritalStatus', value: '', validations: []},
    },{
      config: {
        label: 'Pincode',
        placeholder: 'Enter pincode' ,
        errors: {
          minlength: 'Pincode too short',
          maxlength: 'Pincode too long',
          pattern: 'Pincode should only contain numbers',
        }
      },
      fieldType: FIELD_TYPE.INPUT,
      formControlConfig: {name: 'pincode', value: '', validations: [Validators.minLength(6),Validators.maxLength(6), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]},
      style: {'width': '150px'}
    },{
      config: {
        label: 'Region',
        placeholder: 'Eg, State,Country' ,
      },
      fieldType: FIELD_TYPE.INPUT,
      formControlConfig: {name: 'region', value: '', validations: []},
    }
  ];
  prefilledFormValues = null;
  accountCreated: boolean;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const storedBasicInfo = localStorage.getItem('completeProfile');
    if(storedBasicInfo) {
        this.prefilledFormValues = JSON.parse(storedBasicInfo);
        if (Object.keys(this.prefilledFormValues).includes('spouse')) {
          this.fields = this.addField([...this.fields], 2 + 1, {
            config: {
              label: 'Spouse name',
              placeholder: 'Enter your spouse name',
            },
            fieldType: FIELD_TYPE.INPUT,
            formControlConfig: {name: 'spouse', value: '', validations: []},
          });
        }
    }
  }

  onFormSubmit(event) {
    if(event.valid) {
      localStorage.setItem('completeProfile', JSON.stringify(event.value));
      this.accountCreated = true;
    }
  }

  onFormValueChanges(event) {
    const currentFields = [...this.fields];
    if(event.value.maritalStatus === 'married' && !Object.keys(event.value).includes('spouse')) {
      this.fields = this.addField(currentFields, 2 + 1, {
        config: {
          label: 'Spouse name',
          placeholder: 'Enter your spouse name',
        },
        fieldType: FIELD_TYPE.INPUT,
        formControlConfig: {name: 'spouse', value: '', validations: []},
      });
      this.prefilledFormValues = {...event.value}
    }
    if(event.controls.pincode.valid && event.value.pincode) {
      this.http.get('https://api.postalpincode.in/pincode/' + event.value.pincode).subscribe(res => {
        const state = res[0].PostOffice[0].State;
        const country = res[0].PostOffice[0].Country;
        this.prefilledFormValues = {
          ...event.value,
          region: `${state}, ${country}`
        }
      })
    }
  }

  onFormClose(event) {
    const formValue = event.value;
    localStorage.setItem('completeProfile', JSON.stringify(formValue));
  }

  addField(currentFields, index, field) {
    currentFields.splice(index, 0, field)
    return currentFields;
  }
}
