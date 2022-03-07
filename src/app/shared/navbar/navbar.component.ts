import {Component} from '@angular/core';
import {LocalStorageKeyEnum, RolesEnum} from "../../enums/enum";
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
  buttonMenuDashBoard: boolean = false;
  buttonMenuQuantitive: boolean = false;
  buttonMenuQuantitiveChildren: boolean = false;
  buttonMenuSettings: boolean = false;
  buttonMenuCommunityAgents: boolean = false;
  buttonMenuForum: boolean = false;
  buttonMenuTrakingSheet: boolean = false;
  buttonMenuContact: boolean = false;
  buttonMenuAssignment: boolean = true;

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

    this.buttonMenuQuantitiveChildren = false;
    this.buttonMenuCommunityAgents = false;
    this.buttonMenuTrakingSheet = false;
    this.buttonMenuQuantitive = false;
    this.buttonMenuAssignment = false;
    this.buttonMenuDashBoard = false;
    this.buttonMenuSettings = false;
    this.buttonMenuContact = false;
    this.buttonMenuForum = false;
  }

  private typeRole(rol: any) {
    switch (rol) {
      case RolesEnum.SUPERVISOR:
        this.rol = 'Supervisor';
        this.buttonMenuQuantitiveChildren = true;
        this.buttonMenuCommunityAgents = true;
        this.buttonMenuTrakingSheet = true;
        this.buttonMenuAssignment = true;
        this.buttonMenuQuantitive = true;
        this.buttonMenuDashBoard = true;
        this.buttonMenuSettings = true;
        this.buttonMenuContact = true;
        this.buttonMenuForum = true;
        break;
      case RolesEnum.USER:
        this.rol = 'Invitado';
        this.buttonMenuSettings = true;
        this.buttonMenuContact = true;
        this.buttonMenuForum = true;
        break;
      case RolesEnum.P_CAMPO:
        this.rol = 'Psicólogo de campo';
        this.buttonMenuDashBoard = true;
        this.buttonMenuTrakingSheet = true;
        this.buttonMenuQuantitiveChildren = true;
        this.buttonMenuQuantitive = true;
        this.buttonMenuSettings = true;
        this.buttonMenuContact = true;
        this.buttonMenuForum = true;
        break;
      case RolesEnum.AGENTE:
        this.rol = 'Agente comunitario';
        this.buttonMenuDashBoard = true;
        this.buttonMenuCommunityAgents = true;
        this.buttonMenuSettings = true;
        this.buttonMenuContact = true;
        this.buttonMenuForum = true;
        break;
    }
  }
}
