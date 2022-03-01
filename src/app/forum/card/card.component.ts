import {Component, Input, OnInit} from '@angular/core';
import {ShowDetailService} from "../show-detail.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() recibiendoData: any;

  constructor(private showDetailssService: ShowDetailService) {
  }

  ngOnInit(): void {
    console.log('La data recibida de forum es: ', this.recibiendoData)
  }

  showDetail() {
    console.log("Esta fue la card seleccionada: ")
    console.log(this.recibiendoData)
    this.showDetailssService.disparadorDeDetalles.emit({
      data: this.recibiendoData
    })
  }
}
