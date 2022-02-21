import {Component, OnInit} from '@angular/core';
import {ShowImagesService} from "../show-images.service";

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.scss']
})
export class ShowImagesComponent implements OnInit {
  public obteniendoImages: Array<any> = [];

  //@Input() dataEntrante:any;
  constructor(private showImagesServicio: ShowImagesService) {
  }

  auxiliar!: string;

  ngOnInit(): void {
    this.showImagesServicio.disparadorDeImages.subscribe(
      data => {
        console.log("la data es: " + data);
        this.obteniendoImages.push(data);
      })
    console.log("estamos en la vista de las imagenes")
    this.obteniendoImages.push('./assets/images/care-routes/telephone-routes/1.jpg');

  }


}
