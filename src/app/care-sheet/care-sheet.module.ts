import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from "../angular-material.module";
import {CareSheetComponent} from "./care-sheet.component";


@NgModule({
  declarations: [
    CareSheetComponent
  ],
  exports: [
    CareSheetComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class CareSheetModule {
}
