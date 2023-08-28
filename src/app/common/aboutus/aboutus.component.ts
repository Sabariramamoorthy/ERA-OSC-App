import { Component } from '@angular/core';
import { aboutUs } from 'src/Config/Constant';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  about !:any
  constructor(){
    this.about=aboutUs
  }
}
