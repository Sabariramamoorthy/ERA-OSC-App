import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-carousel',
  templateUrl: './photo-carousel.component.html',
  styleUrls: ['./photo-carousel.component.css']
})
export class PhotoCarouselComponent  {
  @Input() photos:any[]=[];
  loading:boolean=true;
  constructor(){
    this.photos 
  }
 
imageloading:boolean=true;
  activeIndex = 0;

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.photos.length;
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.photos.length) % this.photos.length;
  }

  loaded(){
    console.log(this.imageloading);
    
this.imageloading=false;
console.log(this.imageloading);

  }
}

