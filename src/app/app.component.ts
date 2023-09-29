import { Component, OnInit } from '@angular/core';

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
    }, 3000);
  }
 
}

  

