import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantitativeInstrumentComponent } from './quantitative-instrument.component';
import {AngularMaterialModule} from "../angular-material.module";
import {MatStepperModule} from "@angular/material/stepper";
import {SelectQuantitativeInstrumentDialog} from "../shared/navbar/navbar.component";

@NgModule({
  declarations: [
    QuantitativeInstrumentComponent,
    SelectQuantitativeInstrumentDialog,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatStepperModule
  ]
})
export class QuantitativeInstrumentModule {

}
