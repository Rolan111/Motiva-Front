import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportsComponent} from "./reports.component";
import {AngularMaterialModule} from "../angular-material.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import { PoliticaSaludMentalComponent } from './politica-salud-mental/politica-salud-mental.component';
import { GeneralesComponent } from './generales/generales.component';



@NgModule({
  declarations: [
    ReportsComponent,
    PoliticaSaludMentalComponent,
    GeneralesComponent
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
