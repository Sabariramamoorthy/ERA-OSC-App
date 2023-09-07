import { Component, OnInit } from '@angular/core';
import { ColorConst, Color } from 'src/Config/color';
import { ProductPostComponent } from './shared/product-post/product-post.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Online Shopping Cart';
  Show:boolean=true;
  startup:boolean=true;
  ngOnInit(): void {
    setTimeout(() => {
      this.startup=false;
      this.Show = false; 
    }, 1500);
  }
 
}

  

