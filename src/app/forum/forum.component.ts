import {Component, OnInit} from '@angular/core';
import {ForumService} from "./forum.service";


@Component({
  selector: 'app-foro',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  public cards: any = []

  constructor(private forumServicee: ForumService) {

  }

  ngOnInit(): void {
    this.cargarData()
  }

  public cargarData() {
    this.forumServicee.getAll().subscribe((respuesta: any) => {
      console.log('La data de forum es', respuesta.data)
      this.cards = respuesta.data;
    });
  }

}
