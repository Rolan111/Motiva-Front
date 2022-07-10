import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CareRasmService} from "./care-rasm.service";

@Component({
  selector: 'app-care-rasm',
  templateUrl: './care-rasm.component.html',
  styleUrls: ['./care-rasm.component.scss']
})
export class CareRasmComponent implements OnInit {

  listRASM: any = [];
  displayedColumns: string[] = ['id_poll', 'type_rasm'];
  dataSource!: MatTableDataSource<any>;

  constructor(private careRasmService: CareRasmService) {
  }

  ngOnInit(): void {
    this.loadRASM()
  }

  private loadRASM() {
    this.careRasmService.getAllRASM().subscribe(data => {
      console.log('La data de RASM es: ',data)
      this.listRASM = data;
      this.dataSource = new MatTableDataSource(this.listRASM)
    })
  }
}
