import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DynamicFormModule} from './dynamic-form/dynamic-form.module';
import { BasicInfoComponent } from './pages/basic-info/basic-info.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import {MatButtonModule} from "@angular/material/button";
import { CompleteProfileComponent } from './pages/complete-profile/complete-profile.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    BasicInfoComponent,
    CreateProfileComponent,
    CompleteProfileComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DynamicFormModule,
        MatButtonModule,
        BrowserModule,
        HttpClientModule
    ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
