import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerInputAdminComponent } from './date-picker-input-admin.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslationDialogService} from "../../../../../../services/admin/translation-dialog/translation-dialog.service";

describe('DatePickerInputAdminComponent', () => {
  let component: DatePickerInputAdminComponent;
  let fixture: ComponentFixture<DatePickerInputAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerInputAdminComponent ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      providers: [
        TranslateService,
        TranslationDialogService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerInputAdminComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
