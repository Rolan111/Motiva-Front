import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedbackComponent} from "./feedback.component";
import {AngularMaterialModule} from "../angular-material.module";



@NgModule({
  declarations: [
    FeedbackComponent
  ],
  exports: [
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],

})
export class FeedbackModule { }
