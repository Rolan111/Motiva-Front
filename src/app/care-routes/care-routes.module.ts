import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CareRoutesComponent} from "./care-routes.component";
import {AngularMaterialModule} from "../angular-material.module";
import {GalleryCarouselComponent} from './gallery-carousel/gallery-carousel.component';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GalleryComponent} from './gallery/gallery.component';


@NgModule({
  declarations: [
    CareRoutesComponent,
    GalleryCarouselComponent,
    GalleryComponent
  ],
  exports: [
    CareRoutesComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class CareRoutesModule {
}
