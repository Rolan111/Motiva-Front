import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CareRasmService} from "./care-rasm.service";
import {AlertsModel} from "../alerts/alerts.component";

export interface careRasmModel {
  id_poll: number;
  professional: string;
  municipality: string;
  date: string;
  nameBeneficiary: string;
  //lastNameBeneficiary: string;
  identification: number;
  typeIdentification: string;
  score: number;
  cellphone: number;
  //type_identification: string;
}

@Component({
  selector: 'app-care-rasm',
  templateUrl: './care-rasm.component.html',
  styleUrls: ['./care-rasm.component.scss']
})
export class CareRasmComponent implements OnInit {

  listRASM: any = [];
  procesamientoDeCareRasm: careRasmModel[] = [];
  displayedColumns: string[] = ['id_poll', 'type_rasm', 'professional', 'beneficiary', 'identification', 'cellphone', 'seguimiento'];
  dataSource!: MatTableDataSource<any>;

  constructor(private careRasmService: CareRasmService) {
  }

  ngOnInit(): void {
    this.loadRASM()
  }

  private loadRASM() {
    this.careRasmService.getAllRASM().subscribe(data => {

      this.listRASM = data;
      console.log('La data de RASM es: ', this.listRASM[1])
      this.dataSource = new MatTableDataSource(this.listRASM)
    })
  }
}
