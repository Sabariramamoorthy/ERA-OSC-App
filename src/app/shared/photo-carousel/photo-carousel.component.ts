import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-carousel',
  templateUrl: './photo-carousel.component.html',
  styleUrls: ['./photo-carousel.component.css']
})
export class PhotoCarouselComponent{
  @Input() photos:any[]=[];

  constructor(){
    this.photos 
  }

  activeIndex = 0;

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.photos.length;
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.photos.length) % this.photos.length;
  }
}

