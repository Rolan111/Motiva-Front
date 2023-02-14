import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

export interface UserData {
  id: string;
  name: string;
  progress: string;
  atenciones: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const MUNICIPIOS: string[] = [
    '',
  'POPAYAN' ,
  'ALMAGUER' ,
  'ARGELIA' ,
  'BALBOA' ,
  'BOLIVAR' ,
  'BUENOS AIRES' ,
  'CAJIBIO' ,
  'CALDONO' ,
  'CALOTO' ,
  'CORINTO' ,
  'EL TAMBO' ,
  'FLORENCIA' ,
  'GUACHENE' ,
  'GUAPI' ,
  'INZA' ,
  'JAMBALO' ,
  'LA SIERRA' ,
  'LA VEGA' ,
  'LOPEZ' ,
  'MERCADERES' ,
  'MIRANDA' ,
  'MORALES' ,
  'PADILLA' ,
  'PAEZ' ,
  'PIAMONTE' ,
  'PIENDAMO' ,
  'PUERTO TEJADA' ,
  'PATIA' ,
  'PURACE' ,
  'ROSAS' ,
  'SAN SEBASTIAN' ,
  'SANTANDER DE QUILICHAO' ,
  'SANTA ROSA' ,
  'SILVIA' ,
  'SOTARA' ,
  'SUAREZ' ,
  'SUCRE' ,
  'TIMBIO' ,
  'TIMBIQUI' ,
  'TORIBIO' ,
  'TOTORO' ,
  'VILLA RICA'
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name',  'atenciones'];
  dataSource: MatTableDataSource<UserData>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor() {
    // Create 100 users
    const users = Array.from({length: MUNICIPIOS.length-1}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const num_atenciones = Math.round(Math.random() * 1429);

  // @ts-ignore
  return {
    id: id.toString(),
    name: MUNICIPIOS[id],
    atenciones: num_atenciones.toString(),
    //progress: Math.round((num_atenciones*100)/1429).toString()

  };
}
