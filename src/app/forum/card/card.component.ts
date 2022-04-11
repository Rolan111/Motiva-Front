import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() recibiendoData: any = [];

  constructor() {
  }

  ngOnInit(): void {
    console.log('La data recibida en card de forum es: ', this.recibiendoData)
  }

  showDetail() { //solo para probar que hemos seleccionado
    console.log("Esta fue la card seleccionada: ", this.recibiendoData)
  }
}
