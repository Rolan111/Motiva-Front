import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  formLogin: FormGroup;
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
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
    console.log(data.value)
    if ((data.value.userId != null && data.value.password != null) || (data.value.userId != "" || data.value.password != "")) {
      this.loginService.login(data.value).subscribe(response => {
        console.log(response)
        if (response.username != null)
          this.router.navigateByUrl('/navbar');
      })
    } else {
      this.openSnackBar("Los campos usuario y contraseña deben de estar llenos", "error");
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
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
