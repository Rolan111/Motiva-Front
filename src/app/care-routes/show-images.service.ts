import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowImagesService {

  @Output() disparadorDeImages: EventEmitter<any> = new EventEmitter();

}
