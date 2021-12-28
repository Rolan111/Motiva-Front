import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from '@angular/router';
import {LoginInterface} from "./login.interface";
import {LocalStorageKeyEnum} from "../enums/enum";
import {LocalStorage} from "../storage/local-storage";
import {conditionallyCreateMapObjectLiteral} from "@angular/compiler/src/render3/view/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  // @ts-ignore
  formLogin: FormGroup;
  hide: boolean = true;
  userNameLogin: string = '';
  oLocalStorage = new LocalStorage();

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private activateRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm();
  }

  loginForm() {
    this.formLogin = this.formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength(12)]],
      password: [null, [Validators.required]],
    });
  }

  login(data: FormGroup) {
    if ((data.value.username == null && data.value.password == null) || (data.value.username == "" && data.value.password == "")) {
      this.openSnackBar("Los campos usuario y contraseña deben estar llenos", "alert");
      return;
    }
    if (data.value.username == null || data.value.username == "") {
      this.openSnackBar("El campo número de documento no puede estar vacío", "Alert");
      return;
    }
    if (data.value.password == null || data.value.password == "") {
      this.openSnackBar("El campo contraseña no puede estar vacío", "Alert");
      return;
    }

    console.log(data.value)
    this.loginService.logIn(data.value).subscribe((response: LoginInterface) => {
      if (response.fullName != null) {
        this.setLocalStorage(response);
        this.router.navigateByUrl('/navbar');
      }
    }, error => {
      if (error.status === 401 || error.statusText === "ok"){
        this.openSnackBar("Error al iniciar session", "Alert");
        return;
      }
      this.openSnackBar("Usuario o Contraseña es incorrecta", "Alert");
    })
  }

  private setLocalStorage(user: LoginInterface) {
    this.cleanLocalStorage();
    this.oLocalStorage.setItem(LocalStorageKeyEnum.userName, user.userName);
    this.oLocalStorage.setItem(LocalStorageKeyEnum.fullName, user.fullName);
    this.oLocalStorage.setItem(LocalStorageKeyEnum.token, user.token);
    this.oLocalStorage.setItem(LocalStorageKeyEnum.rol, user.rol);
    this.oLocalStorage.setItem(LocalStorageKeyEnum.type, user.type);
  }

  private cleanLocalStorage() {
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.rol);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.userName);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.fullName);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.type);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.token);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.formLogin.controls[controlName];
    if (!control) {
      return false;
    }

    return control.hasError(validationType) && (control.dirty || control.touched);
  }

}
