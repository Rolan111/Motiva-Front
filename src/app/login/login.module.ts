import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login.component";
import {AngularMaterialModule} from "../angular-material.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent,
  ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        SharedModule,
    ]
})
export class LoginModule {
}
