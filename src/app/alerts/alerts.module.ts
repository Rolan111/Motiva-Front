import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertsComponent} from "./alerts.component";
import {AngularMaterialModule} from "../angular-material.module";
import {HttpClientModule} from "@angular/common/http";
import {InstrumentReviewComponent} from "./instrument-review/instrument-review.component";
import {InactiveAlertsComponent} from "./inactive-alerts/inactive-alerts.component";
import {DialogInactiveAlertComponent} from './dialogs/dialog-inactive-alert/dialog-inactive-alert.component';
import {DialogRasmComponent} from './dialogs/dialog-rasm/dialog-rasm.component';


@NgModule({
  declarations: [
    AlertsComponent,
    InstrumentReviewComponent,
    InactiveAlertsComponent,
    DialogInactiveAlertComponent,
    DialogRasmComponent
  ],
  exports: [
    AlertsComponent,
    InstrumentReviewComponent,
    InactiveAlertsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
  ]
})
export class AlertsModule {
}
