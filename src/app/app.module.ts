import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginModule} from "./login/login.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "./shared/shared.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {RepComAgentModule} from "./rep-com-agent/rep-com-agent.module";
import {TrackingSheetModule} from "./tracking-sheet/tracking-sheet.module";
import {TrackingSheetFollowUsersModule} from "./tracking-sheet-follow-users/tracking-sheet-follow-users.module";
import {ForumModule} from "./forum/forum.module";
import {CareRoutesModule} from "./care-routes/care-routes.module";
import {QuantitativeInstrumentsModule} from "./quantitative-instruments/quantitative-instruments.module";
import {CareSheetModule} from "./care-sheet/care-sheet.module";
import {AlertsModule} from "./alerts/alerts.module";
import {CareRasmModule} from "./care-rasm/care-rasm.module";
import {SupportModule} from "./support/support.module";
import {ReportsModule} from "./reports/reports.module";
import {InformedConsentModule} from "./informed-consent/informed-consent.module";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { environment } from '../environments/environment';
import { MatProgressBarModule} from "@angular/material/progress-bar";
import {NavbarModule} from "./shared/navbar/navbar.module";
import {FeedbackModule} from "./feedback/feedback.module";
import {MatPaginatorModule} from '@angular/material/paginator';
import { ConsultasTemporalComponent } from './consultas-temporal/consultas-temporal.component';
import {ConsultasTemporalModule} from "./consultas-temporal/consultas-temporal.module";


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
    QuantitativeInstrumentsModule,
    RepComAgentModule,
    TrackingSheetModule,
    TrackingSheetFollowUsersModule,
    ForumModule,
    CareRoutesModule,
    CareSheetModule,
    AlertsModule,
    CareRasmModule,
    SupportModule,
    ReportsModule,
    InformedConsentModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    MatProgressBarModule,
    NavbarModule,
    FeedbackModule,
    MatPaginatorModule,
    ConsultasTemporalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
