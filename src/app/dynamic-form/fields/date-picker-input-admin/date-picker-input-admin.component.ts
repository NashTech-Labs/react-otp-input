import {AfterViewInit, Component, DoCheck, forwardRef, Input} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'app-date-picker-input-admin',
    templateUrl: './date-picker-input-admin.component.html',
    styleUrls: ['./date-picker-input-admin.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => DatePickerInputAdminComponent)
    }],
})
export class DatePickerInputAdminComponent implements AfterViewInit, ControlValueAccessor, DoCheck {
    @Input() label: string
    @Input() minDate: Date = null;
    @Input() config: DatePickerInputConfigModel;
    @Input() errors: any;
    @Input() valid: boolean;
    public onChange: (value: any) => void;
    public onTouched: () => void;
    datePickerFormControl = new FormControl('')

    ngAfterViewInit() {
        this.datePickerFormControl.valueChanges.subscribe(res => this.onChange(res))
    }

    ngDoCheck() {
        if (this.valid) {
            this.datePickerFormControl.setErrors(null);
        } else {
            this.datePickerFormControl.setErrors(this.errors)
        }
    }

    writeValue(obj: any) {
        this.datePickerFormControl.setValue(obj);
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    onBlur() {
        this.onTouched();
    }

    setDisabledState(isDisabled: boolean) {
        if (isDisabled) {
            this.datePickerFormControl.disable()
        } else {
            this.datePickerFormControl.enable()
        }
    }


  get errorMessage() {
    if (this.config.errors) {
      return Object.keys(this.config.errors).filter(key => this.datePickerFormControl.hasError(key)).map(errorKey => {
        return this.config.errors[errorKey]
      })
    } else {
      return ['']
    }
  }
}

export interface DatePickerInputConfigModel {
    label: string,
    placeholder? : string,
    minDate?: Date,
    hint?: string,
    errors?: any
}
