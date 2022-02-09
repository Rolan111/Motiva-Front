import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForumComponent} from "./forum.component";
import {AngularMaterialModule} from "../angular-material.module";
import {ReportDescriptionComponent} from './report-description/report-description.component';


@NgModule({
  declarations: [
    ForumComponent,
    ReportDescriptionComponent
  ],
  exports: [
    ForumComponent,
    ReportDescriptionComponent
  ],
  imports: [

    CommonModule,
    AngularMaterialModule,
  ]
})
export class ForumModule {
}
