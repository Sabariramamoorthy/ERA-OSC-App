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
    { url: './assets/banner_51 (1).jpg',
    button:"Explore now !" ,
    title: "Unveiling 2023's Hottest Fashion Trends",
    text:"Welcome to ONLINE SHOPPIN CART, your destination for the freshest fashion finds. Embrace sustainability, vibrant colors, and versatile designs. Elevate your wardrobe with statement accessories, textured fabrics, and tailored classics." },
    { url: './assets/banner_51.jpg',
     button:"Explore the future today" ,
     title: 'Discover the Future of Tech Accessories',text:"Introducing our latest arrivals in tech innovation. Elevate your style and functionality with cutting-edge gadgets. From sleek smartwatches to futuristic mobile cases, we've got the perfect accessories for your digital lifestyle. Stay connected, stay stylish" },
    { url: './assets/banner_31.jpg',
    button:"Elevate your fashion game " , 
    title: 'Discover the Artistry of Dressing',
    text:"Unlock a realm of fashion mastery with our carefully curated selection of dresses, sarees, and kurtis. Immerse yourself in the fusion of cultural elegance and contemporary chic. From intricate detailing to comfortable designs" },
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

