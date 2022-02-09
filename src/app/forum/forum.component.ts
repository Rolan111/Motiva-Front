import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-foro',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  longText = `Este es un breve resumen o nota del post.`;

  constructor() {
  }

  ngOnInit(): void {
  }

}
