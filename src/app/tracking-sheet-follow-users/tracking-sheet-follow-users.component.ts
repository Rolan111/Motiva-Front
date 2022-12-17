import { Component, OnInit } from '@angular/core';
import {TrankingSheetFollowUsersService} from "./tracking-sheet-follow-users.service";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-tracking-sheet-follow-users',
  templateUrl: './tracking-sheet-follow-users.component.html',
  styleUrls: ['./tracking-sheet-follow-users.component.scss']
})
export class TrackingSheetFollowUsersComponent implements OnInit {

  arrayDetrackingSheetFollowUsersTabla: any = [];


  displayedColumns: string[] = ['names', 'lastnames', 'identificationType', 'identification', 'typeRoute', 'referredEntity', 'attentionStatus'];
  dataSource!: MatTableDataSource<any>;

  constructor(private trackingSheetFollowUsersService: TrankingSheetFollowUsersService) { }

  ngOnInit(): void {


    this.loadTrackinSheetFollowUsers();

  }

  private loadTrackinSheetFollowUsers() {

    this.trackingSheetFollowUsersService.getAllTrankingSheet().subscribe(data => {

      this.arrayDetrackingSheetFollowUsersTabla = data;
      console.log('La data de seguimiento de usuarios es: ', this.arrayDetrackingSheetFollowUsersTabla)
      this.dataSource = new MatTableDataSource(this.arrayDetrackingSheetFollowUsersTabla)
      console.log('La data es: ', data)


      }
    )

  }

}
