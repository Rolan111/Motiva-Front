import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {QuantitativeInstrumentComponent} from "./quantitative-instrument/quantitative-instrument.component";
import {RepComAgentComponent} from "./rep-com-agent/rep-com-agent.component";
import {QuantitativeInstrumentChildrenComponent} from "./quantitative-instrument-children/quantitative-instrument-children.component";
import {TrackingSheetComponent} from "./tracking-sheet/tracking-sheet.component";
import {ForumComponent} from "./forum/forum.component";
import {ReportDescriptionComponent} from "./forum/report-description/report-description.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {
    path: 'navbar', component: NavbarComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'quantitative', component: QuantitativeInstrumentComponent},
      {path: 'quantitative-children', component: QuantitativeInstrumentChildrenComponent},
      {path: 'community-agents', component: RepComAgentComponent},
      {path: 'tracking-sheet', component: TrackingSheetComponent},
      {path: 'forum', component: ForumComponent},
      {path: 'forum/report-description', component: ReportDescriptionComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
