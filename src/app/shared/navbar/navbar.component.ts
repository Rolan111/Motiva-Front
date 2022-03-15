import {Component} from '@angular/core';
import {LocalStorageKeyEnum, RolesEnum} from "../../enums/enum";
import {LocalStorage} from "../../storage/local-storage";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

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

  constructor(
    public dialog: MatDialog
  ) {
    this.fullName = this.oLocalStorage.getItem(LocalStorageKeyEnum.name) + " " + this.oLocalStorage.getItem(LocalStorageKeyEnum.lastName);
    this.typeRole(this.oLocalStorage.getItem(LocalStorageKeyEnum.rol));
  }

  openDialog(): void {
    this.dialog.open(SelectQuantitativeInstrumentDialog, {
      width: '350px',
    });
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

@Component({
  selector: 'select-quantitative-instrument-dialog',
  template:  `
    <div mat-dialog-content style="text-align: -webkit-center">
      <p>Seleccione el tipo de instrumento cuantitativo que desea aplicar, niños iguales o menores de 13 años, adultos
        igual o mayores a 14 años.</p>
    </div>
    <div mat-dialog-actions style="place-content: center">
      <button mat-button (click)="childrenClick()">Niños</button>
      <button mat-button (click)="adultClick()">Adultos</button>
    </div>`,
})
export class SelectQuantitativeInstrumentDialog {
  constructor(
    private router: Router,
  public dialogRef: MatDialogRef<SelectQuantitativeInstrumentDialog>,
  ) {}

  adultClick(): void {
    this.router.navigateByUrl('navbar/quantitative')
    this.dialogRef.close();
  }

  childrenClick(): void {
    this.router.navigateByUrl('navbar/quantitative-children')
    this.dialogRef.close();
  }
}
