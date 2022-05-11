import {Component, OnInit} from '@angular/core';
import {ImageModel} from "../imageModel";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  //public selectedImage?: number = null;
  public selectedImage: any = null;
  public images = [
    {
      url: './assets/images/care-routes/telephone-routes/1.jpg',
      row: '1/2'
    },
    {
      url: './assets/images/care-routes/telephone-routes/2.jpg',
      row: '2/2'
    },
    {
      url: './assets/images/care-routes/telephone-routes/3.jpg',
      row: '1/2'
    },
    {
      url: './assets/images/care-routes/telephone-routes/4.jpg',
      row: '2/2',
      col: '5'
    }
  ] as Array<ImageModel>;

  ngOnInit(): void {
    //console.log('Imagen inicial: ',this.selectedImage)
  }

  revisarImagenSeleccionada(i: any) {
    //console.log('la imagen seleccionada fue: ',i)
  }
}
