import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuantitativeInstrumentModule} from "./quantitative-instrument/quantitative-instrument.module";
import {
  QuantitativeInstrumentChildrenModule
} from "./quantitative-instrument-children/quantitative-instrument-children.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuantitativeInstrumentModule,
    QuantitativeInstrumentChildrenModule
  ]
})
export class QuantitativeInstrumentsModule { }
