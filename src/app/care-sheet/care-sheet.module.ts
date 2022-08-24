import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from "../angular-material.module";
import {CareSheetComponent} from "./care-sheet.component";
import {MatStepperModule} from "@angular/material/stepper";



@NgModule({
  declarations: [
    CareSheetComponent
  ],
  exports: [
    CareSheetComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatStepperModule
  ]
})
export class CareSheetModule {

}
