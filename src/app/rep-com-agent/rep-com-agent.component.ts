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
      activityName: ['', Validators.required],
      activityNumber: ['', Validators.required],
      date: ['', Validators.required],
      duration: ['', Validators.required],
      place: ['', Validators.required],
      numberAttendees: ['', Validators.required],
      activityObjectives: ['', Validators.required],
      resourcesUsed: ['', Validators.required],
      methodologyUsed: ['', Validators.required],
      activityDescriptionDevelopment: ['', Validators.required],
      resourcesObtained: ['', Validators.required],
      evidence: ['', Validators.required], //AGREGAR EVIDENCE AL BACKEND
      activityProfessionalincharge: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: any) => { //para capturar ID desde la url en el navegador
      const {params} = paramMap
      this.loadData();
    })
  }

  public loadData() {
    this.RepComAgentService.get('http://localhost:5000/api/rep-com-agents').subscribe(respuesta => {
      console.log('Recibiendo datos de rep-com-agent !');
      console.log(respuesta)
    })
  }


  public loadDataById(id: string) {
    this.RepComAgentService.get(`http://localhost:3000/rep-com-agent/${id}`)
      .subscribe(respuesta => {
        this.respuesta = respuesta;
      })
  }

  public sendData() {
    this.RepComAgentService.post('http://localhost:5000/api/rep-com-agent-create',
      {
        activityName: this.form.value.activityName,
        activityNumber: this.form.value.activityNumber,
        date: this.form.value.date,
        duration: this.form.value.duration,
        place: this.form.value.place,
        numberAttendees: this.form.value.numberAttendees,
        activityObjectives: this.form.value.activityObjectives,
        resourcesUsed: this.form.value.resourcesUsed,
        methodologyUsed: this.form.value.methodologyUsed,
        activityDescriptionDevelopment: this.form.value.activityDescriptionDevelopment,
        resourcesObtained: this.form.value.resourcesObtained,
        evidence: this.form.value.evidence,
        activityProfessionalincharge: this.form.value.activityProfessionalincharge,

      }).subscribe(respuesta => {
      console.log('Registro CARGADO a rep-com-agent !');
    })
  }

  updateData() {
    this.RepComAgentService.update('http://localhost:3000/rep-com-agent/1',
      {
        activityName: "nombre 1",
        activityNumber: "Numero 2",
        date: "fecha nueva",
        duration: "duracion 1",
        place: "lugar 1",
        numberAttendees: "Numero asistentes 1",
        activityObjectives: "Objetivos de actividad 1",
        resourcesUsed: "Recursos usados 1",
        methodologyUsed: "Metodologia usada 1",
        activityDescriptionDevelopment: "Descripción 1",
        resourcesObtained: "Recursos obtenidos 1",
        evidence: "Evidencias 1",
        activityProfessionalincharge: "Profesional a carga 1",

      }).subscribe(respuesta => {
      console.log('Registro ACTUALIZADO a rep-com-agent !');
    })
  }

  deleteData() {
    this.RepComAgentService.delete('http://localhost:3000/rep-com-agent/5').subscribe(respuesta => {
      console.log('Registro ELIMINADO en rep-com-agent !');
    })
  }

}
