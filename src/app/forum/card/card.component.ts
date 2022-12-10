import {Component, Input, OnInit} from '@angular/core';
import moment from "moment/moment";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() recibiendoData: any = [];
  date: any;


  ngOnInit(): void {
    this.date = moment(this.recibiendoData.createdAt).format('DD-MM-YYYY');

    console.log('La data recibida en card de forum es: ', this.recibiendoData)
  }

  showDetail( data : any) { //solo para probar que hemos seleccionado
    /*console.log("Data: ", data)
    console.log("Esta fue la card seleccionada: ", this.recibiendoData)*/
  }
}
