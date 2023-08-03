import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-product-post',
  templateUrl: './product-post.component.html',
  styleUrls: ['./product-post.component.css']
})

export class ProductPostComponent {
  SoftCopyForm = new FormGroup({
    CustomerName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]),
    CustomerPriority: new FormControl(''),
    ProductName: new FormControl('', [Validators.required]),
    ProductSize: new FormControl('', [Validators.required]),
    ProductQuty: new FormControl('', [Validators.required]),
    ProductRequirement: new FormControl('', [Validators.required]),
    ProductQuery: new FormControl(''),
    ProductImage: new FormControl('', [Validators.required]),
    ProductReferenceImage: new FormControl('', [Validators.required]),
    ProductOtherImages: new FormControl('', [Validators.required]),
    PaymentType: new FormControl('', [Validators.required]),
    PaymentAmount: new FormControl('', [Validators.required]),
    PaymentScreenShot: new FormControl('', [Validators.required]),
  });
  get sc() {
    return this.SoftCopyForm.controls;
  }
  ImagePreview !:any;
  UploadOrder(value:any)
  {

  }

  async detectFiles(event: any, type: string) {
    //const compressPromises: Promise<void>[] = [];
    let files = event.target.files;
    
  }
  signRole: string = "Select the Payment Type";
}


