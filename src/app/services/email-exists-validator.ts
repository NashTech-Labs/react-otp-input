import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {delay, map} from "rxjs/operators";

export class EmailExistsValidator {
  static createValidator(): AsyncValidatorFn {
      return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return fakeService(control.value).pipe(
          map(res => {
            if (res) {
              return null
            } else {
              return {'usernameExists': true}
            }
          })
        )
      };
  }
}

function fakeService(value: string): Observable<any> {
  const isEven = !(value.length % 2);
  return of(isEven).pipe( delay(1000))
}
