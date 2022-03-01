import {Component, OnInit} from '@angular/core';
import {ShowDetailService} from "../show-detail.service";
import {ActivatedRoute} from "@angular/router";
import {ForumService} from "../forum.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;


  constructor(
    private showDetailssService: ShowDetailService,
    private forumServicee: ForumService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      //name: ['', Validators.required],
      //date: ['', Validators.required],
      comment: ['', Validators.required],

    })
  }

  public descriptionDetail: any = []

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
      const {params} = paramMap
      this.cargarReportes(params.variable)
      //this.traerDataDelServicio()
      this.loadComments(params.variable)
      this.capturaUrl = params.variable
    })
  }

  cargarReportes(id: string) {
    this.forumServicee.get(`${id}`).subscribe(respuesta => {
      this.respuesta = respuesta;
    })
  }

  traerDataDelServicio() {
    this.showDetailssService.disparadorDeDetalles.subscribe(data => {
      console.log('Recibiendo data en el DETALLE ...', data)
      this.respuesta = data;
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
