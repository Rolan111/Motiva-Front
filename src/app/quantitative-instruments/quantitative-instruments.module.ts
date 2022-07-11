import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuantitativeInstrumentModule} from "./quantitative-instrument/quantitative-instrument.module";
import {
  QuantitativeInstrumentChildrenModule
} from "./quantitative-instrument-children/quantitative-instrument-children.module";
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuantitativeInstrumentModule,
    QuantitativeInstrumentChildrenModule,
    MatTooltipModule
  ]
})
export class QuantitativeInstrumentsModule { }
