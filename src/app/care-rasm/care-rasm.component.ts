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
  //'id_poll',
  displayedColumns: string[] = ['type_rasm', 'professional', 'beneficiary', 'typeIdentification', 'identification', 'municipality', 'cellphone', 'typeQuestionnaire', 'score', 'seguimiento'];
  dataSource!: MatTableDataSource<any>;

  constructor(private careRasmService: CareRasmService,
              private router: Router
  ) {


  }

  ngOnInit(): void {
    this.loadRASM()
    //this.getIdPoll()

  }

  private loadRASM() {
    this.careRasmService.getAllRasm().subscribe(data => {

      this.listRASM = data;
      console.log('La data de RASM es: ', this.listRASM)
      this.dataSource = new MatTableDataSource(this.listRASM)
    })
  }

  getIdPoll(){
    this.careRasmService.getRASMByIdPoll(this.careRasmService.id_poll).subscribe(data=>{
        this.sendTotrackingSeet()
      }
    )
  }

  private sendTotrackingSeet() {
   this.careRasmService.id_poll = 'id poll';
   this.careRasmService.nameBeneficiary = 'ca';
   this.careRasmService.lastNameBeneficiary = 'mello';
   this.careRasmService.type_identification = 'cc';
   this.careRasmService.identification = 66;
   this.careRasmService.typeRasm = 'SUSTA';
   this.router.navigate(['navbar/tracking-sheet'])
  }



}
