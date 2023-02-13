export class TrackingSheetModel {
  idPoll: string;
  dateTracking:string;
  names: string;
  lastnames: string;
  identificationType: string;
  identification: string;
  typeRoute: string;
  referredEntity: string;
  attentionStatus: string;
  recommendations: string;

  constructor(idPoll: string, dateTracking: string, names: string, lastnames: string, identificationType: string, identification: string, typeRoute: string, referredEntity: string, attentionStatus: string, recommendations: string) {
    this.idPoll = idPoll;
    this.dateTracking = dateTracking;
    this.names = names;
    this.lastnames = lastnames;
    this.identificationType = identificationType;
    this.identification = identification;
    this.typeRoute = typeRoute;
    this.referredEntity = referredEntity;
    this.attentionStatus = attentionStatus;
    this.recommendations = recommendations;
  }
}
