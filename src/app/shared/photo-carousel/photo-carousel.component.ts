import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-carousel',
  templateUrl: './photo-carousel.component.html',
  styleUrls: ['./photo-carousel.component.css']
})
export class PhotoCarouselComponent{
  images: string[] = [
    'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp'
  ];

  photos = [
    { url: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp', alt: 'Photo 1' },
    { url: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp', alt: 'Photo 2' },
    { url: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp', alt: 'Photo 3' },
    // Add more photos here
  ];

  activeIndex = 0;

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.photos.length;
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.photos.length) % this.photos.length;
  }
}

