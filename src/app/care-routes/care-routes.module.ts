import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CareRoutesComponent} from "./care-routes.component";
import {AngularMaterialModule} from "../angular-material.module";
import {ShowImagesComponent} from './show-images/show-images.component';


@NgModule({
  declarations: [
    CareRoutesComponent,
    ShowImagesComponent
  ],
  exports: [
    CareRoutesComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ]
})
export class CareRoutesModule {
}
