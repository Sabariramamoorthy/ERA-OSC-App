import { Component, OnInit } from '@angular/core';
import { ColorConst, Color } from 'src/Config/color';
import { ColorService } from './services/color.service';
import { ProductPostComponent } from './shared/product-post/product-post.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ONline Shopping Cart';
  Show:boolean=true;
  ngOnInit(): void {
    setTimeout(() => {
      this.Show = false; 
    }, 6000);
  }
 
}

  

