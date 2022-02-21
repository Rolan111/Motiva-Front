import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ShowImagesComponent} from "./show-images/show-images.component";
import {ShowImagesService} from "./show-images.service";

@Component({
  selector: 'app-care-routes',
  templateUrl: './care-routes.component.html',
  styleUrls: ['./care-routes.component.scss']
})
export class CareRoutesComponent implements OnInit {
  //@Input() dataEntrante:any;

  public urlImages: Array<any> = [];
  public pasamosImages: Array<any> = [];

  public pasandoImagen!: string;


  constructor(private matDialog: MatDialog, private showImagesService: ShowImagesService) {
  }

  ngOnInit(): void {

    this.urlImages = [
      {
        url: './assets/images/care-routes/telephone-routes/1.jpg'
      },
      {
        url: './assets/images/care-routes/telephone-routes/2.jpg'
      },
      {
        url: './assets/images/care-routes/telephone-routes/3.jpg'
      },
      {
        url: './assets/images/care-routes/telephone-routes/4.jpg'
      }
    ]
  }

  openDialog2(imagen11: any) {
    this.pasandoImagen = imagen11;
    console.log("la imagen seleccionada fue: " + this.pasandoImagen);
    this.showImagesService.disparadorDeImages.emit(this.pasandoImagen);
    this.openDialog3()
  }

  openDialog3() {
    this.matDialog.open(ShowImagesComponent);
  }


}


