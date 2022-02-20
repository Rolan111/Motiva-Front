export class OptionAnswer {
  description: string;
  idOptionAnswer: number;
  idQuestion: number;
  order: number;
  type: string;

  constructor(description: string, idOptionAnswer: number, idQuestion: number, order: number, type: string) {
    this.description = description;
    this.idOptionAnswer = idOptionAnswer;
    this.idQuestion = idQuestion;
    this.order = order;
    this.type = type;
  }
}
