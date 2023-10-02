import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catergory',
  templateUrl: './catergory.component.html',
  styleUrls: ['./catergory.component.css']
})
export class CatergoryComponent {
  constructor(private _router:Router){

  }
  preview(tag:any)
  {
    this._router.navigate(['/', 'category',tag])
  }
}
