export class PollModel {
  approvalDoc: string;
  evidence: string;
  idCity: number;
  type: string;

  constructor(approvalDoc: string, evidence: string, idCity: number, type: string) {
    this.approvalDoc = approvalDoc;
    this.evidence = evidence;
    this.idCity = idCity;
    this.type = type;
  }
}
