export class QuestionModel {
  id_question: number;
  description: string;
  id_father: number;
  id_question_type: number;
  order: number;

  constructor(id_question: number, description: string, id_father: number, id_question_type: number, order: number) {
    this.id_question = id_question;
    this.description = description;
    this.id_father = id_father;
    this.id_question_type = id_question_type;
    this.order = order;
  }
}