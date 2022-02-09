import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginModule} from "./login/login.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "./shared/shared.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {QuantitativeInstrumentModule} from "./quantitative-instrument/quantitative-instrument.module"
import {
  QuantitativeInstrumentChildrenModule
} from "./quantitative-instrument-children/quantitative-instrument-children.module";
import {RepComAgentModule} from "./rep-com-agent/rep-com-agent.module";
import {TrackingSheetModule} from "./tracking-sheet/tracking-sheet.module";
import {ForumModule} from "./forum/forum.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LoginModule,
    SharedModule,
    DashboardModule,
    QuantitativeInstrumentModule,
    QuantitativeInstrumentChildrenModule,
    RepComAgentModule,
    TrackingSheetModule,
    ForumModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
