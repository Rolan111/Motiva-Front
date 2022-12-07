import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogWarningSesion} from "../../shared/navbar/navbar.component";
import {AngularMaterialModule} from "../../angular-material.module";
import {SharedModule} from "../shared.module";


@NgModule({
  declarations: [
    DialogWarningSesion
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
  ]
})
export class NavbarModule { }
