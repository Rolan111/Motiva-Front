import {Component, Input, OnInit} from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() recibiendoComments: any;
  date: any;



  ngOnInit(): void {
    this.date = moment(this.recibiendoComments.createdAt).format('DD-MM-YYYY');
    //console.log('Comentarios: ', this.recibiendoComments)
  }

}
