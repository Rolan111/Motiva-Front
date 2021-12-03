import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(
    fb: FormBuilder,
    private loginService: LoginService,
  ) {
    this.formLogin = fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.getAllUsers()
  }

  getAllUsers() {
    this.loginService.findAllUsers().subscribe(response =>
      console.log(response)
    )
  }
}
