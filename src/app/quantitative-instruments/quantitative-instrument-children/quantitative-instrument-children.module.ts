import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuantitativeInstrumentChildrenComponent} from './quantitative-instrument-children.component';
import {AngularMaterialModule} from "../../angular-material.module";
import {MatStepperModule} from "@angular/material/stepper";


@NgModule({
  declarations: [
    QuantitativeInstrumentChildrenComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatStepperModule
  ]
})
export class QuantitativeInstrumentChildrenModule { }
