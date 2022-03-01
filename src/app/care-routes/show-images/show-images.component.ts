import {Component, OnInit} from '@angular/core';
import {ShowImagesService} from "../show-images.service";

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.scss']
})
export class ShowImagesComponent implements OnInit {
  //public obteniendoImages: Array<any> = [];
  public obteniendoUrl: any;


  //@Input() dataEntrante:any;
  constructor(private showImagesServicio: ShowImagesService) {
  }

  public obteniendoImages: any;

  ngOnInit(): void {
    this.showImagesServicio.disparadorDeImages.subscribe(
      data => {
        //console.log('la data RECIBIDA en SHOW es: ', data);
        //this.obteniendoImages = data;
        //this.obteniendoImages = data;
        this.obteniendoImages = data;
        this.obteniendoUrl = data;
        this.obteniendoImages = data;
        const {enviemos} = data

        this.cargarEsaImagen(this.obteniendoUrl)
      })
    //console.log("estamos en la vista de las imagenes")
    //this.obteniendoImages.push('./assets/images/care-routes/telephone-routes/1.jpg');
    //this.obteniendoImages = './assets/images/care-routes/telephone-routes/1.jpg';

  }

  cargarEsaImagen(data1: string) {
    this.obteniendoImages = data1;
    console.log('la data RECIBIDA en METODO en SHOW es: ', data1);
    this.obteniendoImages = data1;

    //this.obteniendoImages = './assets/images/care-routes/telephone-routes/1.jpg';
  }


}
