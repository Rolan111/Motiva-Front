import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() userName: string ="";


  constructor() {
    console.log("User name : ", this.userName)
  }

  logOut() {
    console.log('');
  }
}
