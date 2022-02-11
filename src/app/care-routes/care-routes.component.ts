import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ShowImagesComponent} from "./show-images/show-images.component";

@Component({
  selector: 'app-care-routes',
  templateUrl: './care-routes.component.html',
  styleUrls: ['./care-routes.component.scss']
})
export class CareRoutesComponent {

  constructor(private matDialog: MatDialog) {
  }

  openDialog2() {
    this.matDialog.open(ShowImagesComponent);
  }


}


