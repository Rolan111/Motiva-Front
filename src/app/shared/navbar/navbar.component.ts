import {Component} from '@angular/core';
import {LocalStorageKeyEnum, RolesEnum} from "../../enums/enum";
import {LocalStorage} from "../../storage/local-storage";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {QuantitativeInstrumentService} from "../../quantitative-instruments/quantitative-instrument.service";

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
  // buttonMenuQuantitiveChildren: boolean = false;
  buttonMenuTrackingSheet: boolean = false;
  buttonMenuCommunityAgents: boolean = false;
  buttonMenuForum: boolean = false;
  buttonMenuCareRoutes: boolean = false;
  buttonMenuCareRasm: boolean = false;
  buttonMenuCareSheet: boolean = false;
  buttonMenuAlerts: boolean = false;
  buttonMenuInactiveAlerts: boolean = false;
  buttonMenuSupport: boolean = false;
  buttonMenuReports: boolean = false;
  buttonMenuOva: boolean = false;

  buttonMenuContact: boolean = false;
  buttonMenuAssignment: boolean = true;
  buttonMenuSettings: boolean = false;

  constructor(
    public dialog: MatDialog,
    public quantitativeInstrumentService:QuantitativeInstrumentService
  ) {
    this.fullName = this.oLocalStorage.getItem(LocalStorageKeyEnum.name) + " " + this.oLocalStorage.getItem(LocalStorageKeyEnum.lastName);
    this.typeRole(this.oLocalStorage.getItem(LocalStorageKeyEnum.rol));
    this.quantitativeInstrumentService.shareDataSession = this.fullName;
  }

  openDialog(): void {
    this.dialog.open(SelectQuantitativeInstrumentDialog, {
      width: '550px',
    });
  }

  logOut() {
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.rol);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.lastName);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.name);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.type);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.token);

    this.buttonMenuDashBoard = false;
    this.buttonMenuQuantitive = false;
    // this.buttonMenuQuantitiveChildren = false;
    this.buttonMenuTrackingSheet = false;
    this.buttonMenuCommunityAgents = false;
    this.buttonMenuForum = false;
    this.buttonMenuCareRoutes = false;
    this.buttonMenuCareRasm = false;
    this.buttonMenuCareSheet = false;
    this.buttonMenuAlerts = false;
    this.buttonMenuInactiveAlerts = false;
    this.buttonMenuSupport = false;
    this.buttonMenuReports = false;
    this.buttonMenuOva = false;

    this.buttonMenuAssignment = false;
    this.buttonMenuSettings = false;
    this.buttonMenuContact = false;

  }

  private typeRole(rol: any) {
    switch (rol) {
      case RolesEnum.SUPERVISOR:
        this.rol = 'Supervisor';
        this.buttonMenuDashBoard = true;
        this.buttonMenuQuantitive = true;
        // this.buttonMenuQuantitiveChildren = true;
        this.buttonMenuCareSheet = true;
        this.buttonMenuCommunityAgents = true;
        this.buttonMenuForum = true;
        this.buttonMenuCareRoutes = true;
        this.buttonMenuCareRasm = true;
        this.buttonMenuTrackingSheet = true;
        this.buttonMenuAlerts = true;
        this.buttonMenuInactiveAlerts = true;
        this.buttonMenuSupport = true;
        this.buttonMenuReports = true;
        this.buttonMenuOva = true;
        break;
      case RolesEnum.P_CAMPO:
        this.rol = 'Psicólogo de campo';
        this.buttonMenuDashBoard = true;
        this.buttonMenuQuantitive = true;
        this.buttonMenuCareSheet = true;
        this.buttonMenuForum = true;
        this.buttonMenuCareRoutes = true;
        this.buttonMenuCareRasm = true;
        this.buttonMenuOva = true;
        break;
      case RolesEnum.AGENTE:
        this.rol = 'Agente comunitario';
        this.buttonMenuDashBoard = true;
        this.buttonMenuCommunityAgents = true;
        this.buttonMenuForum = true;
        this.buttonMenuCareRoutes = true;
        this.buttonMenuOva = true;

        this.buttonMenuSettings = true;
        this.buttonMenuContact = true;
        break;
      case RolesEnum.USER:
        this.rol = 'Invitado';
        this.buttonMenuCareRoutes = true;
        this.buttonMenuForum = true;
        this.buttonMenuOva = true;

        this.buttonMenuSettings = true;
        this.buttonMenuContact = true;

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
