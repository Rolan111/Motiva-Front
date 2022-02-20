import {OptionAnswer} from "./option-answer.model";

export class Question {
  createdAt: Date;
  createdBy: number;
  description: string;
  id: string;
  idFather: number;
  idQuestion: number;
  optionAnswerDtoList: Array<OptionAnswer>;
  order: number;
  questionaryType: string;
  status: string;
  type: string;
  updatedAt: Date;
  updatedBy: number;

  constructor(createdAt: Date, createdBy: number, description: string, id: string, idFather: number, idQuestion: number, optionAnswerDtoList: Array<OptionAnswer>, order: number, questionaryType: string, status: string, type: string, updatedAt: Date, updatedBy: number) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.description = description;
    this.id = id;
    this.idFather = idFather;
    this.idQuestion = idQuestion;
    this.optionAnswerDtoList = optionAnswerDtoList;
    this.order = order;
    this.questionaryType = questionaryType;
    this.status = status;
    this.type = type;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
  }
}
