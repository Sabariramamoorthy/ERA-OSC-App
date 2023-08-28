import { Component, Input } from '@angular/core';
import { termsAndConditions, worksteps } from 'src/Config/Constant';

@Component({
  selector: 'app-work-terms',
  templateUrl: './work-terms.component.html',
  styleUrls: ['./work-terms.component.css']
})
export class WorkTermsComponent {
steps !:any[];
terms !:any[];

@Input() page:boolean=true;

constructor(){
  this.steps=worksteps;
  this.terms=termsAndConditions;
}
}
