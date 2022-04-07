import {Component, OnInit} from '@angular/core';
import {AlertsService} from "./alerts.service";

export interface Alerts {
  profesional: number;
  beneficiario: string;
  municipio: number;
  fecha: string;
}

const listAlerts: Alerts[] = [
  {profesional: 1, beneficiario: 'Hydrogen', municipio: 1.0079, fecha: 'H'}
];

//let alertando:any = [];

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alertando: any = [];

  displayedColumns: string[] = ['id', 'id_alert', 'id_poll'];
  //dataSource = listAlerts;
  dataSource = this.alertando;


  constructor(private alertsService: AlertsService) {
  }

  ngOnInit(): void {
    this.loadAlerts();
  }


  private loadAlerts() {
    this.alertsService.getAllAlerts().subscribe(data => {
      console.log('Las alertas son: ', data)
      this.alertando = data;
    })
  }
}
