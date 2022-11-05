import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from '@angular/router';
import {LoginInterface} from "./login.interface";
import {LocalStorageKeyEnum} from "../enums/enum";
import {LocalStorage} from "../storage/local-storage";
import {LoginModel} from "./login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  hide: boolean = true;
  oLocalStorage = new LocalStorage();
  loginResponse!: LoginInterface;

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
      this.openSnackBar("Debe ingresar datos de usuario y contraseña", "alert");
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

    this.loginService.logIn(data.value).subscribe({
      next: (response: LoginInterface) => {
        console.log('La data de sesión es: ',response)
        this.responseLogin(response);
      }, error: (error) => {
        if (error.status === 401 || error.statusText === "ok") {
          this.openSnackBar("Usuario o Contraseña incorrecta", "Alert");
          return;
        }
        this.openSnackBar("Error al iniciar session", "Alert");
      }
    })
  }

  private responseLogin(response: LoginInterface) {
    if (response.name != null) {
      this.setLocalStorage(response);
      this.router.navigateByUrl('/navbar');
    }
  }

  logInMock(dataForm: any) {
    this.loginService.attemptAuthMock(dataForm).subscribe(
      data => {
        this.loginResponse = data.data;
        this.setLocalStorage(this.loginResponse);
        this.router.navigateByUrl('/navbar');
      }
    );
  }

  guestLogin() {
    let guest: LoginModel = {
      username: "1061801200",
      password: "Pe1061801200"
    }

    this.loginService.logIn(guest).subscribe({
      next: (response: LoginInterface) => {
        this.responseLogin(response);
      }
    })
  }

  private setLocalStorage(user: LoginInterface) {
    this.cleanLocalStorage();
    this.oLocalStorage.setItem(LocalStorageKeyEnum.name, user.userName);
    this.oLocalStorage.setItem(LocalStorageKeyEnum.name, user.name);
    this.oLocalStorage.setItem(LocalStorageKeyEnum.lastName, user.last_name);
    this.oLocalStorage.setItem(LocalStorageKeyEnum.token, user.token);
    this.oLocalStorage.setItem(LocalStorageKeyEnum.rol, user.job_profile);
    this.oLocalStorage.setItem(LocalStorageKeyEnum.type, user.type);
  }

  private cleanLocalStorage() {
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.rol);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.lastName);
    this.oLocalStorage.removeItem(LocalStorageKeyEnum.name);
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
