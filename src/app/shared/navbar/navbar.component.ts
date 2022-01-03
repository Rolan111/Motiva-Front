import {Component, Input} from '@angular/core';
import {LocalStorageKeyEnum} from "../../enums/enum";
import {LocalStorage} from "../../storage/local-storage";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() fullName: string = "";
  oLocalStorage = new LocalStorage();


  constructor() {
    this.fullName = this.oLocalStorage.getItem(LocalStorageKeyEnum.name) + " " + this.oLocalStorage.getItem(LocalStorageKeyEnum.lastName);
    if (LocalStorageKeyEnum.userName === null){
      
    }
  }

  logOut() {
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.rol);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.lastName);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.name);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.type);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.token);
  }
}
