import {Component, OnInit} from '@angular/core';
import {RepComAgentService} from "./rep-com-agent.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-rep-com-agent',
  templateUrl: './rep-com-agent.component.html',
  styleUrls: ['./rep-com-agent.component.scss']
})
export class RepComAgentComponent implements OnInit {

  form: FormGroup;
  submited = false;
  public respuesta: any = [];

  constructor(
    private route: ActivatedRoute,
    private RepComAgentService: RepComAgentService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {

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
      evidence: ['', Validators.required],
      activityProfessionalIncharge: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
      const {params} = paramMap
      // this.loadData();
    })
  }

  public loadData() {
    this.RepComAgentService.get().subscribe(respuesta => {

    })
  }

  public probandoReactivos() {

    this.submited = true;
    if (this.form.invalid) { //no deja pasar si no es valido
      return;
    }
    this.toastr.success('El reporte de agente comunitario ha sido cargado!', 'Registro exitoso');
    console.log(this.form);
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
        activityProfessionalIncharge: this.form.value.activityProfessionalIncharge,

      }).subscribe(respuesta => {

    })
  }

  updateData() {
    this.RepComAgentService.update(
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
        activityProfessionalIncharge: "Profesional a carga 1",

      }).subscribe(respuesta => {

    })
  }

  deleteData() {
    this.RepComAgentService.delete().subscribe(respuesta => {

    })
  }

}
