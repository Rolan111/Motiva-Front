export class DataResponse {
  auxErrorCode: any;
  data: any;
  errors: any;
  message: any;
  prototype: any;

  constructor(auxErrorCode: any, data: any, errors: any, message: any, prototype: any) {
    this.auxErrorCode = auxErrorCode;
    this.data = data;
    this.errors = errors;
    this.message = message;
    this.prototype = prototype;
  }
}
