import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent  implements OnInit {
  name: boolean = false;
  Subname: boolean = true;
  sale:boolean=true;
  ngOnInit(): void {
    setTimeout(() => {
      this.name = true;
      this.Subname=false 
    }, 2000);
    setTimeout(() => {
      this.Subname = true;
      this.sale=false;
    }, 4000);
  }
 
}
