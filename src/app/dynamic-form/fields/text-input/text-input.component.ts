import {AfterViewInit, Component, DoCheck, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => TextInputComponent)
  }]
})

export class TextInputComponent implements AfterViewInit, ControlValueAccessor, DoCheck {
  @Input() config: TextInputConfigModel;
  @Input() abstractControl: AbstractControl;
  @Input() verificationPending: boolean;
  @Input() errors: any;
  @Input() valid: boolean;
  isDisabled = false;
  private onChange: (value: string) => void;
  private onTouched: () => void;
  inputField = new FormControl('');

  ngAfterViewInit() {
    this.inputField.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  ngDoCheck() {
    if (this.valid) {
      this.inputField.setErrors(null);
    } else {
      this.inputField.setErrors(this.errors);
    }
  }

  writeValue(obj: any) {
    this.inputField.setValue(obj);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.inputField.disable();
    } else {
      this.inputField.enable();
    }
  }

  handleOnBlur() {
    this.onTouched();
  }

  get errorMessage() {
    if (this.config.errors) {
      return Object.keys(this.config.errors).filter(key => this.inputField.hasError(key)).map(errorKey => {
        return this.config.errors[errorKey]
      })
    } else {
      return ['']
    }
  }
}

export interface TextInputConfigModel {
  label: string;
  placeholder?: string;
  type?: string;
  hint?: string;
  errors?: any;
  showStatusCheck?: boolean;
}
