import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AngularMaterialModule} from "../angular-material.module";
import {CareRasmComponent} from "./care-rasm.component";

@NgModule({
  declarations: [
    CareRasmComponent
  ],
  exports: [
    CareRasmComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class CareRasmModule {

}
