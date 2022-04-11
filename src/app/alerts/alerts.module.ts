import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertsComponent} from "./alerts.component";
import {AngularMaterialModule} from "../angular-material.module";
import {HttpClientModule} from "@angular/common/http";
import {InstrumentReviewComponent} from "./instrument-review/instrument-review.component";


@NgModule({
  declarations: [
    AlertsComponent,
    InstrumentReviewComponent
  ],
  exports: [
    AlertsComponent,
    InstrumentReviewComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
  ]
})
export class AlertsModule {
}
