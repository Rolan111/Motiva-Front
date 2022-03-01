import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() recibiendoComments: any;

  constructor() {
  }

  ngOnInit(): void {
    console.log('La data recibida de report-description es: ', this.recibiendoComments)
  }

}
