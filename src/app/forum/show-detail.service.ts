import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowDetailService {
  @Output() disparadorDeDetalles: EventEmitter<any> = new EventEmitter();

  constructor() {
  }
}
