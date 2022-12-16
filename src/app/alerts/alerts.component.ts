import {Component, OnInit} from '@angular/core';
import {AlertsService} from "./alerts.service";


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alertSizeAux: number[] = [];
  arrayDeAlertas: any = [];
  arrayDeAlertasTabla: any = [];
  displayedColumns: string[] = ['id_poll', 'professional', 'beneficiary', 'typeIdentification', 'identification', 'cellphone', 'municipality', 'typeQuestionnaire', 'date', 'score','review'];
  dataSource = this.arrayDeAlertasTabla;

  constructor(private alertsService: AlertsService) {
  }

  ngOnInit(): void {
    //Consultamos la cantidad de registros
    this.alertsService.getAlertSize().subscribe((data: any) => {
      this.alertSizeAux.push(data);
      console.log('La cantidad de alertas es: ',data)
    })
    this.loadAlerts();
    console.log('La captura de la cantidad de datos en alerts es: ', this.alertsService.getAlertSize2())
  }


  private loadAlerts() {

    this.alertsService.getAllAlerts().subscribe(data => {
      console.log('Las alertas capturadas son: ',data)
      this.arrayDeAlertasTabla = data
      }
    )

  }

}
