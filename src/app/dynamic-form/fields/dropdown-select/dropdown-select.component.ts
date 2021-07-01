import {AfterViewInit, Component, forwardRef, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => DropdownSelectComponent)
  }
  ]
})
export class DropdownSelectComponent implements AfterViewInit, ControlValueAccessor {
  @Input() config: DropdownSelectConfigModel;
  @Input() abstractControl: AbstractControl;
  private onChange: (value: string) => void;
  private onTouched: () => void;
  selectFormField = new FormControl('')

  ngAfterViewInit(): void {
    this.selectFormField.valueChanges.subscribe(res => this.onChange(res))
  }

  writeValue(obj: any) {
    this.selectFormField.setValue(obj);
  }

  ngDoCheck() {
    if (this.abstractControl.valid) {
      this.selectFormField.setErrors(null);
    } else {
      this.selectFormField.setErrors(this.abstractControl.errors);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  handleTouched() {
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.selectFormField.disable();
    } else {
      this.selectFormField.enable();
    }
  }
}

export interface DropdownSelectConfigModel {
  label: string;
  options: DropdownListModel[];
  placeholder?: string,
  hint?: string,
}

export interface DropdownListModel {
  name: string,
  value: string,
}

