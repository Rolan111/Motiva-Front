import {Component} from '@angular/core';
import {LocalStorageKeyEnum} from "../../enums/enum";
import {LocalStorage} from "../../storage/local-storage";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  fullName: string = '';
  rol: string = '';
  oLocalStorage = new LocalStorage();
  buttonMenuCoord = false;
  buttonMenuCoordTeam = false;
  buttonMenuSuperIntendent = false;
  buttonMenuPsychoLogist = false;
  buttonMenuSocialWorker = false;


  constructor() {
    this.fullName = this.oLocalStorage.getItem(LocalStorageKeyEnum.name) + " " + this.oLocalStorage.getItem(LocalStorageKeyEnum.lastName);
    this.typeRole(this.oLocalStorage.getItem(LocalStorageKeyEnum.rol));
  }

  logOut() {
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.rol);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.lastName);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.name);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.type);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.token);

    this.buttonMenuCoord = false;
    this.buttonMenuCoordTeam = false;
    this.buttonMenuSuperIntendent = false;
    this.buttonMenuPsychoLogist = false;
    this.buttonMenuSocialWorker = false;
  }

  private typeRole(rol: any) {
    switch (rol) {
      case 'SUPERVISOR':
        this.rol = 'Supervisor';
        this.buttonMenuCoord = true;
        break;
      case 'USER':
        this.rol = 'Invitado';
        this.buttonMenuSuperIntendent = true;
        break;
      case 'P_CAMPO':
        this.rol = 'Psicólogo de campo';
        this.buttonMenuPsychoLogist = true;
        break;
      case 'AGENTE':
        this.rol = 'Agente comunitario';
        this.buttonMenuSocialWorker = true;
        break;
    }
  }
}
