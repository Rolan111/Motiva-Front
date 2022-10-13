import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportsComponent} from "./reports.component";
import {AngularMaterialModule} from "../angular-material.module";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    ReportsComponent
  ],
  exports: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatTooltipModule
  ]
})
export class ReportsModule { }
