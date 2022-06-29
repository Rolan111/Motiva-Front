export class PollModel {
  approvalDoc: string;
  evidence: string;
  idCity: number;
  idPoll: string;
  type: string;

  constructor(approvalDoc: string, evidence: string, idCity: number, idPoll:string, type: string) {
    this.approvalDoc = approvalDoc;
    this.evidence = evidence;
    this.idCity = idCity;
    this.idPoll = idPoll;
    this.type = type;
  }
}
