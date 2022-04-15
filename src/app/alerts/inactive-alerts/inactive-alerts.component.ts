import {Component, OnInit} from '@angular/core';
import {AlertsService} from "../alerts.service";
import {MatTableDataSource} from "@angular/material/table";

export interface Alertss {
  id_poll: string;
}

@Component({
  selector: 'app-inactive-alerts',
  templateUrl: './inactive-alerts.component.html',
  styleUrls: ['./inactive-alerts.component.scss']
})

export class InactiveAlertsComponent implements OnInit {

  listInactiveAlerts: any = [];
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
  }

}
