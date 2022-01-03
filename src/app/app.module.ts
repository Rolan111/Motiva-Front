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
    QuantitativeInstrumentModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
