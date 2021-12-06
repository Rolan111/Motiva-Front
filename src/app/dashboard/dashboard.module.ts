import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {AngularMaterialModule} from "../angular-material.module";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ]
})
export class DashboardModule {
}
