import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule} from "../angular-material.module";
import {ConsultasTemporalComponent} from "./consultas-temporal.component";



@NgModule({
  declarations: [
    ConsultasTemporalComponent
  ],
  exports: [
    ConsultasTemporalComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class ConsultasTemporalModule { }
