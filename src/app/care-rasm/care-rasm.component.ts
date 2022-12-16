import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CareRasmService} from "./care-rasm.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-care-rasm',
  templateUrl: './care-rasm.component.html',
  styleUrls: ['./care-rasm.component.scss']
})
export class CareRasmComponent implements OnInit {
  listRASM: any = [];
  displayedColumns: string[] = ['type_rasm', 'professional', 'beneficiary', 'typeIdentification', 'identification', 'municipality', 'cellphone', 'typeQuestionnaire', 'score', 'seguimiento'];
  dataSource!: MatTableDataSource<any>;

  constructor(private careRasmService: CareRasmService,
  ) {


  }

  ngOnInit(): void {

    this.loadRASM()

  }

  private loadRASM() {
    this.careRasmService.getAllRasm().subscribe(data => {
      this.listRASM = data;
      console.log('La data de RASM es: ', this.listRASM)
      this.dataSource = new MatTableDataSource(this.listRASM)
    })
  }



}
