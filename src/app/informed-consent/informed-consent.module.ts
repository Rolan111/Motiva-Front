import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InformedConsentComponent} from "./informed-consent.component";
import {AngularMaterialModule} from "../angular-material.module";
import {MatStepperModule} from "@angular/material/stepper";
import {MatProgressBar, MatProgressBarModule} from "@angular/material/progress-bar";



@NgModule({
  declarations: [
    InformedConsentComponent
  ],
  exports: [
    InformedConsentComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatStepperModule,
    MatProgressBarModule
  ]
})
export class InformedConsentModule { }
