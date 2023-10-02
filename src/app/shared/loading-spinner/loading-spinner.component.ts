import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

@Input() spinner :boolean=false;
@Input() skelton:boolean=false;
@Input() cardCount :number=6;
CardArray :any[]= []
ngOnInit(): void {
  this.CardArray= new Array(this.cardCount)
}
}
