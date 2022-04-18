import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {QuantitativeInstrumentComponent} from "./quantitative-instruments/quantitative-instrument/quantitative-instrument.component";
import {RepComAgentComponent} from "./rep-com-agent/rep-com-agent.component";
import {QuantitativeInstrumentChildrenComponent} from "./quantitative-instruments/quantitative-instrument-children/quantitative-instrument-children.component";
import {TrackingSheetComponent} from "./tracking-sheet/tracking-sheet.component";
import {ForumComponent} from "./forum/forum.component";
import {ReportDescriptionComponent} from "./forum/report-description/report-description.component";
import {CareRoutesComponent} from "./care-routes/care-routes.component";
import {CareSheetComponent} from "./care-sheet/care-sheet.component";
import {AuthGuard} from "./guards/auth.guard";
import {AlertsComponent} from "./alerts/alerts.component";
import {InstrumentReviewComponent} from "./alerts/instrument-review/instrument-review.component";
import {CareRasmComponent} from "./care-rasm/care-rasm.component";
import {InactiveAlertsComponent} from "./alerts/inactive-alerts/inactive-alerts.component";
import {OVAComponent} from "./ova/ova.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {
    path: 'navbar', component: NavbarComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'quantitative', component: QuantitativeInstrumentComponent, canActivate: [AuthGuard]},
      {path: 'quantitative-children', component: QuantitativeInstrumentChildrenComponent, canActivate: [AuthGuard]},
      {path: 'community-agents', component: RepComAgentComponent, canActivate: [AuthGuard]},
      {path: 'tracking-sheet', component: TrackingSheetComponent, canActivate: [AuthGuard]},
      {path: 'forum', component: ForumComponent, canActivate: [AuthGuard]},
      {path: 'forum/report-description/:variable', component: ReportDescriptionComponent, canActivate: [AuthGuard]},
      {path: 'care-routes', component: CareRoutesComponent, canActivate: [AuthGuard]},
      {path: 'care-sheet', component: CareSheetComponent},
      {path: 'alerts', component: AlertsComponent},
      {path: 'alerts/instrument-review/:variable', component: InstrumentReviewComponent},
      {path: 'care-rasm', component: CareRasmComponent},
      {path: 'alerts/inactive-alerts', component: InactiveAlertsComponent},
      {path: 'ova', component: OVAComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
