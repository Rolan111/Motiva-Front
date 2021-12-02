import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login.component";
import {AngularMaterialModule} from "../angular-material.module";


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ]
})
export class LoginModule {
}
