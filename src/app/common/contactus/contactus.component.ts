import { Component } from '@angular/core';
import { Constant, contactUs } from 'src/Config/Constant';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
contact !:any
constructor(){
  this.contact=contactUs;
}
}
