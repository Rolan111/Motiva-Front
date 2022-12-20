import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CareRasmService} from "./care-rasm.service";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {AlertElement} from "../alerts/alerts.component";

@Component({
  selector: 'app-care-rasm',
  templateUrl: './care-rasm.component.html',
  styleUrls: ['./care-rasm.component.scss']
})
export class CareRasmComponent implements OnInit {
  listRASM: any = [];

  displayedColumns: string[] = ['type_rasm', 'professional', 'beneficiary', 'typeIdentification', 'identification', 'municipality', 'cellphone', 'typeQuestionnaire', 'score', 'seguimiento'];
  dataSource = new MatTableDataSource<RasmElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private careRasmService: CareRasmService,
  ) {

  }

  ngOnInit(): void {
    //Consultamos la cantidad de registros
    this.loadRASM();
  }

  private loadRASM() {
    this.careRasmService.getAllRasm().subscribe(data => {
      this.listRASM = data;
      console.log('La data de RASM es: ', this.listRASM)
      this.dataSource = new MatTableDataSource<RasmElement>(this.listRASM);
      this.ngAfterViewInit()
    })
  }

}

export interface RasmElement {
  type_rasm:string;
  professional:string;
  beneficiary:string;
  typeIdentification:string;
  identification:string;
  municipality:string;
  cellphone:string;
  typeQuestionnaire:string;
  score:string;
  seguimiento:string;

}

const ELEMENT_DATA: RasmElement[] = [
  {type_rasm: 'Cargando...', professional: 'Cargando...', beneficiary: 'Cargando...', typeIdentification: 'Cargando...', identification: 'Cargando...', cellphone: 'Cargando...', municipality: 'Cargando..',seguimiento:'Cargando..', typeQuestionnaire: 'Cargando...', score: 'Cargando...' },
];
