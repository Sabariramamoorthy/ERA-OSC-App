import { Component } from '@angular/core';
import { faqDetails } from 'src/Config/Constant';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent {
  faqDeatils !:any[];
  constructor(){
this.faqDeatils=faqDetails;
console.log(this.faqDeatils);
  }
  
  
}
