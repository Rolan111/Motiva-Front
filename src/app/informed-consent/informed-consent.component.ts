import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { AngularFireStorage } from '@angular/fire/storage';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {QuantitativeInstrumentService} from "../quantitative-instruments/quantitative-instrument.service";
import {CareSheetService} from "../care-sheet/care-sheet.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-informed-consent',
  templateUrl: './informed-consent.component.html',
  styleUrls: ['./informed-consent.component.scss']
})
export class InformedConsentComponent implements OnInit {

  completed!:boolean;
  file!: File;

  constructor(private storage: AngularFireStorage,
              private router: Router,
              private careSheetService:CareSheetService,
              private toastr: ToastrService
              ) { }

  idPollRecuperado:string = this.careSheetService.shareIdPoll;

  ngOnInit(): void {
    console.log('El idPoll es: ', this.idPollRecuperado)
  }

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.completed = true;
    }

  }

  uploadFile() {
    this.completed = false;
    const filePath = this.idPollRecuperado+'/'+'consentimiento_informado';
    // Crea una referencia de acceso
    const fileRef = this.storage.ref(filePath);
    fileRef.put(this.file).then(() => {
      this.completed = true;
      this.toastr.success('¡El consentimiento informado ha sido enviado!', 'Caracterización Finalizada');
      this.router.navigate(['navbar/dashboard'])
    });
  }

}
