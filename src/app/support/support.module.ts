import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupportComponent} from "./support.component";
import {AngularMaterialModule} from "../angular-material.module";
import {QuantitativeInstrumentComponent} from "../quantitative-instruments/quantitative-instrument/quantitative-instrument.component";


@NgModule({
  declarations: [
    SupportComponent
  ],
  exports:[
    SupportComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class SupportModule{


}
