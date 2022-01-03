import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantitativeInstrumentComponent } from './quantitative-instrument.component';
import {AngularMaterialModule} from "../angular-material.module";
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
  declarations: [
    QuantitativeInstrumentComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatStepperModule
  ]
})
export class QuantitativeInstrumentModule {

}
