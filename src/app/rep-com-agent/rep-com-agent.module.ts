import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RepComAgentComponent} from "./rep-com-agent.component";
import {AngularMaterialModule} from "../angular-material.module";


@NgModule({
  declarations: [
    RepComAgentComponent,
  ],
  exports: [
    RepComAgentComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ]
})
export class RepComAgentModule {
}


