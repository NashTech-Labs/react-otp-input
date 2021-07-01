import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {TextInputConfigModel} from '../fields/text-input/text-input.component';
import {ImgUploadConfigModel} from '../fields/image-upload/image-upload.component';
import {DropdownSelectConfigModel} from '../fields/dropdown-select/dropdown-select.component';
import {EmailExistsValidator} from "../../services/email-exists-validator";
import {DatePickerInputConfigModel} from "../fields/date-picker-input-admin/date-picker-input-admin.component";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnDestroy, OnChanges {
  @Input() layout: FORM_LAYOUT = FORM_LAYOUT.COL_1;
  @Input() fields: FormFieldModel[] = [
    {
      config: {
        label: 'Partner',
        placeholder: 'Select...',
        options: [{value: '1', name: 'First option'}, {value: '2', name: 'second option'}, ]
      },
      fieldType: FIELD_TYPE.DROPDOWN_SELECT,
      formControlConfig: {name: 'partner', value: '', validations: []},
      // fieldWidth: FIELD_WIDTH.COL_1
    },
    {
      fieldType: FIELD_TYPE.INPUT,
      config: {label: 'label', placeholder: 'enter', errors: {required: 'This is required', emailExists: 'This email exists',}},
      formControlConfig: {
        name: 'input',
        validations: [Validators.required],
        asyncValidations: [EmailExistsValidator.createValidator()],
        value: ''
      },
      fieldWidth: FIELD_WIDTH.COL_2,
      style: {'margin-right': '5px'},
    }, {
      config: {
        label: 'Favicon image',
        acceptedFileTypes: ['.png', '.svg'],
        styles: {width: '120px', height: '120px'}
      },
      fieldType: FIELD_TYPE.IMAGE_UPLOAD,
      formControlConfig: {name: 'faviconImage', value: null, validations: []}
    }
  ];
  @Input() initialFormState: any = null;
  @Input() submitButtonLabel = 'Submit';
  @Input() submitButtonLoadingStateLabel = 'Submitting';
  @Input() isLoading = false;
  @Output() formSubmit = new EventEmitter<FormSubmitEvent>();
  @Output() formClose = new EventEmitter<FormSubmitEvent>();
  @Output() formValueChange = new EventEmitter<any>();
  fieldTypes = FIELD_TYPE;
  form: FormGroup;
  updatingForm: boolean

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields']?.currentValue != changes['fields']?.previousValue || changes['initialFormState']?.currentValue != changes['initialFormState']?.previousValue) {
      this.setForm(this.fields, this.initialFormState);
    }
  }

  ngOnInit(): void {
  }

  setForm(fields: FormFieldModel[], initialFormState?: any): void {
    this.form = this.buildForm(this.fb, fields, initialFormState);
      this.form.valueChanges.subscribe(res => {
        this.formValueChange.emit(this.form)
      })
  }

  buildForm(fb: FormBuilder, fields: FormFieldModel[], initialFormState?: any): FormGroup {
    const form = fb.group({});
    fields.forEach(field => {
      const formControlConfig = field.formControlConfig;
      const control = fb.control(
        {value: formControlConfig.value, disabled: field.formControlConfig.disabled || false},
        formControlConfig.validations,
        formControlConfig.asyncValidations
      );
      if (initialFormState && initialFormState[field.formControlConfig.name] !== undefined) {
        control.setValue(this.initialFormState[field.formControlConfig.name]);
      }
      form.addControl(formControlConfig.name, control);
    });
    return form;
  }

  onSubmit(): void {
    const payload = {
      valid: this.form.valid,
      value: this.form.getRawValue()
    };
    this.formSubmit.emit(payload);
  }

  ngOnDestroy(): void {
    const payload = {
      valid: this.form.valid,
      value: this.form.getRawValue()
    };
    this.formClose.emit(payload);
  }
}

export interface FormFieldModel {
  fieldType: FIELD_TYPE;
  config: TextInputConfigModel | DropdownSelectConfigModel | ImgUploadConfigModel | DatePickerInputConfigModel;
  formControlConfig: FormControlConfigModel;
  fieldWidth?: FIELD_WIDTH;
  style?: any;
}

export interface FormControlConfigModel {
  name: string;
  value: any;
  validations: ValidatorFn[];
  asyncValidations?: AsyncValidatorFn[];
  disabled?: boolean;
}

export enum FIELD_TYPE {
  INPUT,
  DROPDOWN_SELECT,
  IMAGE_UPLOAD,
  DATE_PICKER,
}

export enum FIELD_WIDTH {
  COL_1 = 'form-field-col-1',
  COL_2 = 'form-field-col-2',
  COL_3 = 'form-field-col-3',
  COL_4 = 'form-field-col-4',
}

export enum FORM_LAYOUT {
  COL_1 = 'col-1',
  COL_2 = 'col-2',
  COL_3 = 'col-3',
  COL_4 = 'col-4',
}

export interface FormSubmitEvent {
  valid: boolean;
  value: any;
}

