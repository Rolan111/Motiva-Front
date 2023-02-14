import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ForumService} from "../forum.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import moment from "moment";

@Component({
  selector: 'app-report-description',
  templateUrl: './report-description.component.html',
  styleUrls: ['./report-description.component.scss']
})
export class ReportDescriptionComponent implements OnInit {

  form: FormGroup;
  public respuesta: any;
  public comments: any = [];
  public capturaUrl: any;
  date: any;

  constructor(
    private forumServicee: ForumService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      comment: ['', Validators.required],

    })
  }

  ngOnInit(): void {
    this.date = moment(this.respuesta?.date).format('DD-MM-YYYY');

    this.route.paramMap.subscribe((paramMap: any) => {
      const {params} = paramMap
      this.cargarReportes(params.variable)
      this.loadComments(params.variable)
      this.capturaUrl = params.variable
    })
  }

  cargarReportes(id: string) {
    this.forumServicee.get(`${id}`).subscribe(respuesta => {
      this.respuesta = respuesta;
    })
  }

  private loadComments(id: string) {
    this.forumServicee.getComments(`${id}`).subscribe(respuesta => {
      console.log('El id traido es: ', id)
      console.log('Estos son los comentarios', respuesta)
      this.comments = respuesta;
    })
  }

  saveComment() {
    this.forumServicee.postComments(this.capturaUrl,
      {
        name: "Anónimo",
        date: "03-2022",
        comment: this.form.value.comment

      }).subscribe(respuesta => {
      console.log('Comentario enviado')
    })
    this.loadComments(this.capturaUrl)
    this.form.reset();
    this.loadComments(this.capturaUrl)
  }
}
