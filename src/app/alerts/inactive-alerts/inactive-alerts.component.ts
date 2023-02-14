/*
import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertsService} from "../alerts.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AlertElement} from "../alerts.component";
*/

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AlertsService} from "../alerts.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

export interface Alertss {
  id_poll: string;
}

@Component({
  selector: 'app-inactive-alerts',
  templateUrl: './inactive-alerts.component.html',
  styleUrls: ['./inactive-alerts.component.scss']
})

export class InactiveAlertsComponent implements OnInit, AfterViewInit {

  /*listInactiveAlerts: any = [];
  displayedColumns: string[] = ['id_poll'];
  dataSource!: MatTableDataSource<any>;

  constructor(private alertService: AlertsService) {
  }

  ngOnInit(): void {
    this.loadInactiveAlerts()
  }


  loadInactiveAlerts() {
    this.alertService.getAllInactiveAlerts().subscribe(data => {
      this.listInactiveAlerts = data;
      this.dataSource = new MatTableDataSource(this.listInactiveAlerts)
    })
  }*/


  alertSizeAux: number[] = [];
  //arrayDeAlertas: any = [];
  arrayDeAlertasTabla: any = [];

  displayedColumns: string[] = [ 'professional', 'beneficiary', 'typeIdentification', 'identification',
    'cellphone', 'municipality', 'typeQuestionnaire', 'date', 'score', 'reason'];
  dataSource = new MatTableDataSource<AlertElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private alertsService: AlertsService) {
  }

  ngOnInit(): void {
    //Consultamos la cantidad de registros
    this.alertsService.getInactiveAlertSize().subscribe((data: any) => {
      this.alertSizeAux.push(data);
      console.log('La cantidad de alertas es: ',data)
    })
    this.loadAlerts();
  }


  private loadAlerts() {
    this.alertsService.getAllInactiveAlerts().subscribe(data => {
      console.log('Las alertas capturadas son: ',data)
      this.arrayDeAlertasTabla = data;
      this.dataSource = new MatTableDataSource<AlertElement>(this.arrayDeAlertasTabla);
      // this.dataSource = data;
      this.ngAfterViewInit()
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


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
  {idPoll: 'Cargando...',
    professional: 'Cargando...',
    beneficiary: 'Cargando...',
    typeIdentification: 'Cargando...',
    identification: 0,
    cellphone: 0,
    municipality: 'Cargando...',
    typeQuestionnaire: 'Cargando...',
    date: 'Cargando...', score: 0},
];
