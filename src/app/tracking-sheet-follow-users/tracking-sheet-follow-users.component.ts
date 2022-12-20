import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TrankingSheetFollowUsersService} from "./tracking-sheet-follow-users.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {RasmElement} from "../care-rasm/care-rasm.component";


@Component({
  selector: 'app-tracking-sheet-follow-users',
  templateUrl: './tracking-sheet-follow-users.component.html',
  styleUrls: ['./tracking-sheet-follow-users.component.scss']
})
export class TrackingSheetFollowUsersComponent implements OnInit {

  arrayDetrackingSheetFollowUsersTabla: any = [];


  displayedColumns: string[] = ['names', 'lastnames', 'identificationType', 'identification', 'typeRoute', 'referredEntity', 'attentionStatus'];
  dataSource = new MatTableDataSource<FollowElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private trackingSheetFollowUsersService: TrankingSheetFollowUsersService) {

  }


  ngOnInit(): void {


    this.loadTrackinSheetFollowUsers();

  }

  private loadTrackinSheetFollowUsers() {

    this.trackingSheetFollowUsersService.getAllTrankingSheet().subscribe(data => {
      this.arrayDetrackingSheetFollowUsersTabla = data;
      console.log('La data de seguimiento de usuarios es: ', this.arrayDetrackingSheetFollowUsersTabla)
      this.dataSource = new MatTableDataSource<FollowElement>(this.arrayDetrackingSheetFollowUsersTabla);
      this.ngAfterViewInit()
      })

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


  }

}

export interface FollowElement {
  names:string;
  lastnames:string;
  identificationType:string;
  identification:string;
  typeRoute:string;
  referredEntity:string;
  attentionStatus:string;

}

const ELEMENT_DATA: FollowElement[] = [
  {names: 'Cargando...', lastnames: 'Cargando...', identificationType: 'Cargando...', identification: 'Cargando...', typeRoute: 'Cargando...', referredEntity: 'Cargando...', attentionStatus: 'Cargando..'},
];
