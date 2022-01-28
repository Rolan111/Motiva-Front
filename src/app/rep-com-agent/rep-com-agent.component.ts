import {Component, OnInit} from '@angular/core';
import {RepComAgentService} from "./rep-com-agent.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-rep-com-agent',
  templateUrl: './rep-com-agent.component.html',
  styleUrls: ['./rep-com-agent.component.scss']
})
export class RepComAgentComponent implements OnInit {

  form: FormGroup;
  public respuesta: any = [];

  constructor(private route: ActivatedRoute, private RepComAgentService: RepComAgentService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      activity_name: ['', Validators.required],
      activity_number: ['', Validators.required],
      date: ['', Validators.required],
      duration: ['', Validators.required],
      place: ['', Validators.required],
      number_attendees: ['', Validators.required],
      activity_objectives: ['', Validators.required],
      resources_used: ['', Validators.required],
      methodology_used: ['', Validators.required],
      activity_description_development: ['', Validators.required],
      resources_obtained: ['', Validators.required],
      evidence: ['', Validators.required],
      activity_professional_incharge: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
      const {params} = paramMap
      this.loadData();
    })
  }

  public loadData() {
    this.RepComAgentService.get().subscribe(respuesta => {

    })
  }


  public loadDataById(id: string) {
    this.RepComAgentService.getById(id)
      .subscribe(respuesta => {
        this.respuesta = respuesta;
      })
  }

  public sendData() {
    this.RepComAgentService.post(
      {
        activity_name: this.form.value.activity_name,
        activity_number: this.form.value.activity_number,
        date: this.form.value.date,
        duration: this.form.value.duration,
        place: this.form.value.place,
        number_attendees: this.form.value.number_attendees,
        activity_objectives: this.form.value.activity_objectives,
        resources_used: this.form.value.resources_used,
        methodology_used: this.form.value.methodology_used,
        activity_description_development: this.form.value.activity_description_development,
        resources_obtained: this.form.value.resources_obtained,
        evidence: this.form.value.evidence,
        activity_professional_incharge: this.form.value.activity_professional_incharge,

      }).subscribe(respuesta => {

    })
  }

  updateData() {
    this.RepComAgentService.update(
      {
        activity_name: "nombre 1",
        activity_number: "Numero 2",
        date: "fecha nueva",
        duration: "duracion 1",
        place: "lugar 1",
        number_attendees: "Numero asistentes 1",
        activity_objectives: "Objetivos de actividad 1",
        resources_used: "Recursos usados 1",
        methodology_used: "Metodologia usada 1",
        activity_description_development: "Descripción 1",
        resources_obtained: "Recursos obtenidos 1",
        evidence: "Evidencias 1",
        activity_professional_incharge: "Profesional a carga 1",

      }).subscribe(respuesta => {

    })
  }

  deleteData() {
    this.RepComAgentService.delete().subscribe(respuesta => {

    })
  }

}
