export class AlertModel {
  idAlert: number;
  // idPoll: number;
  idPoll: string;
  score: number;
  professional: string;
  municipality: string;
  date: string;
  nameBeneficiary: string;
  lastNameBeneficiary: string;
  identification: number;
  typeQuestionnaire: string;
  typeIdentification: string;
  cellphone: number;

  constructor(idAlert: number, idPoll: string,
              score: number, professional: string,
              municipality: string, date: string, nameBeneficiary: string,
              lastNameBeneficiary: string, identification: number, typeIdentification: string, cellphone: number, typeQuestionnaire: string ) {
    this.idAlert = idAlert;
    this.idPoll = idPoll;
    this.score = score;
    this.professional = professional;
    this.municipality = municipality;
    this.date = date;
    this.nameBeneficiary = nameBeneficiary;
    this.lastNameBeneficiary = lastNameBeneficiary;
    this.identification = identification;
    this.typeIdentification = typeIdentification;
    this.cellphone = cellphone;
    this.typeQuestionnaire = typeQuestionnaire
  }
}
//
