import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BasicInfoComponent} from "./pages/basic-info/basic-info.component";
import {CreateProfileComponent} from "./pages/create-profile/create-profile.component";
import {CompleteProfileComponent} from "./pages/complete-profile/complete-profile.component";
import {MatNativeDateModule} from "@angular/material/core";

const routes: Routes = [
  {
    path: '',
    component: BasicInfoComponent
  },{
    path: 'create-profile',
    component: CreateProfileComponent
  },{
    path: 'complete-profile',
    component: CompleteProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatNativeDateModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
