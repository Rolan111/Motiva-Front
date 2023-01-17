import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from "../angular-material.module";
import {CareSheetComponent} from "./care-sheet.component";
import {MatStepperModule} from "@angular/material/stepper";
import {OVAComponent} from "../ova/ova.component";



@NgModule({
  declarations: [
    CareSheetComponent,
    OVAComponent
  ],
  exports: [
    CareSheetComponent,
    OVAComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatStepperModule
  ]
})
export class CareSheetModule {

}
