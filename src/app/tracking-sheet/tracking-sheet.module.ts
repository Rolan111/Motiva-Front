import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrackingSheetComponent} from "./tracking-sheet.component";
import {AngularMaterialModule} from "../angular-material.module";


@NgModule({
  declarations: [
    TrackingSheetComponent
  ],
  exports: [
    TrackingSheetComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class TrackingSheetModule {
}
