import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForumComponent} from "./forum.component";
import {AngularMaterialModule} from "../angular-material.module";
import {ReportDescriptionComponent} from './report-description/report-description.component';
import {CardComponent} from "./card/card.component";
import {HttpClientModule} from "@angular/common/http";
import {CommentsComponent} from './comments/comments.component';


@NgModule({
  declarations: [
    ForumComponent,
    ReportDescriptionComponent,
    CardComponent,
    CommentsComponent
  ],
  exports: [
    ForumComponent,
    ReportDescriptionComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule
  ]
})
export class ForumModule {
}
