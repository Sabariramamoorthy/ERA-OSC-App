import { Component } from '@angular/core';
import { ColorConst, Color } from 'src/Config/color';
import { ColorService } from './services/color.service';
import { ProductPostComponent } from './shared/product-post/product-post.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ERA-OSC-APP';
  backgroundColor !: string;
  elementstyle:any;
  constructor() {}

}
