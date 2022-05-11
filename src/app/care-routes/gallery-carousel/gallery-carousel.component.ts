import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageModel} from "../imageModel";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-gallery-carousel',
  templateUrl: './gallery-carousel.component.html',
  styleUrls: ['./gallery-carousel.component.scss'],
  animations: [
    trigger('slide-in', [
      state('left', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state('middle', style({
        opacity: 1,
        transform: 'translateX(-0)'
      })),
      state('right', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      transition('left => middle', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('250ms')
      ]),
      transition('right => middle', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('250ms')
      ]),
      transition('middle => *', [
        animate('250ms')
      ])
    ])
  ]
})
export class GalleryCarouselComponent implements OnInit {

  @Input() images!: Array<ImageModel>;
  //@Input() selectedImage!: number;
  @Input() selectedImage: any;
  @Output() closeCarousel = new EventEmitter<void>();
  public animState = 'middle';
  //public animImage!: number;
  public animImage: any;

  ngOnInit(): void {
    this.animImage = this.selectedImage;
    //console.log("La imagen seleccionada es: "+this.selectedImage)
  }

  public close(): void {
    this.closeCarousel.emit();

  }

  public previous(): void {
    this.animState = 'left';
    this.selectedImage = this.selectedImage > 0 ? this.selectedImage - 1 : this.images.length - 1;
    this.blur();
  }

  public next(): void {
    this.animState = 'right';
    this.selectedImage = this.selectedImage < this.images.length - 1 ? this.selectedImage + 1 : 0;
    this.blur()
  }

  public animDone(): void {
    this.animImage = this.selectedImage;
    this.animState = 'middle';
  }

  public onEvent(event: Event): void {
    event.stopPropagation();
  }

  public blur(): void {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement !== null) {
      activeElement.blur();
    }
  }

}
