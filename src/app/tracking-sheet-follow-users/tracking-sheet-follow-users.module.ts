import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrackingSheetFollowUsersComponent} from "./tracking-sheet-follow-users.component";
import {AngularMaterialModule} from "../angular-material.module";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    TrackingSheetFollowUsersComponent
  ],
  exports: [
    TrackingSheetFollowUsersComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    MatTableModule
  ]
})
export class TrackingSheetFollowUsersModule {
}
