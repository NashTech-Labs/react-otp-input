import {Component, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => ImageUploadComponent)
  }]
})
export class ImageUploadComponent implements OnInit, ControlValueAccessor {
  private onChange: (value: any) => void;
  public onTouched: () => void;
  @Input() config: ImgUploadConfigModel;
  fileExtensions: string;
  url = '';

  ngOnInit() {
    this.fileExtensions = this.config.acceptedFileTypes.join(', ');
  }

  writeValue(obj: any) {
    if (obj) {
      if (typeof obj === "string") {
        this.url = obj;
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(obj);
        reader.onload = () => {
          this.url = reader.result as string;
        }
      }
    } else {
      this.url = '';
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  fileUploaded(event) {
    const file = event.target.files[0];
    if (this.onChange) {
      this.onChange(file)
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.url = reader.result as string;
      }
      this.fileUploaded(event);
    }
  }
}

export interface ImgUploadConfigModel {
  label: string,
  acceptedFileTypes: string[],
  fileUploadInfo?: {title: string, description}[],
  fileUploadStyle?: string,
  styles?: any,
}
