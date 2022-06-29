export class AlertModel {
  idAlert: number;
  // idPoll: number;
  idPoll: string;
  score: number;

  constructor(idAlert: number, idPoll: string, score: number) {
    this.idAlert = idAlert;
    this.idPoll = idPoll;
    this.score = score;
  }
}
//
