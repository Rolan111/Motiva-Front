import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertsComponent} from "./alerts.component";
import {AngularMaterialModule} from "../angular-material.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AlertsComponent
  ],
  exports: [
    AlertsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule
  ]
})
export class AlertsModule {
}
