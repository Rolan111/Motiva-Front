import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportsComponent} from "./reports.component";
import {AngularMaterialModule} from "../angular-material.module";



@NgModule({
  declarations: [
    ReportsComponent
  ],
  exports: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class ReportsModule { }
