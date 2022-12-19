import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AlertsService} from "./alerts.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})

export class AlertsComponent implements OnInit, AfterViewInit {

  alertSizeAux: number[] = [];
  arrayDeAlertas: any = [];
  arrayDeAlertasTabla: any = [];
  arrayDeAlertasTabla2:AlertElement[] = [];

  displayedColumns: string[] = ['idPoll', 'professional', 'beneficiary', 'typeIdentification', 'identification', 'cellphone', 'municipality', 'typeQuestionnaire', 'date', 'score', 'review'];
  dataSource = new MatTableDataSource<AlertElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private alertsService: AlertsService) {
  }


  ngOnInit(): void {
    //Consultamos la cantidad de registros
    this.alertsService.getAlertSize().subscribe((data: any) => {
      this.alertSizeAux.push(data);
      console.log('La cantidad de alertas es: ',data)
    })
    this.loadAlerts();
  }


  private loadAlerts() {
    this.alertsService.getAllAlerts().subscribe(data => {
      console.log('Las alertas capturadas son: ',data)
      this.arrayDeAlertasTabla = data;
      this.dataSource = new MatTableDataSource<AlertElement>(this.arrayDeAlertasTabla);
      // this.dataSource = data;
      this.ngAfterViewInit()
      })
  }

}

export interface AlertElement {
  idPoll: string;
  professional: string;
  beneficiary: string;
  typeIdentification: string;
  identification: number;
  cellphone: number;
  municipality: string;
  typeQuestionnaire: string;
  date: string;
  score: number;
}

const ELEMENT_DATA: AlertElement[] = [
  {idPoll: 'hola', professional: '1.0079', beneficiary: 'H', typeIdentification: 'H', identification: 1, cellphone: 1, municipality: 'H', typeQuestionnaire: 'H', date: 'H', score: 1},
];
