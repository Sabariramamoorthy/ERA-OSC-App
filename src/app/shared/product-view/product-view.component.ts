import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataGet } from 'src/app/models/file-upload.model';
import { Constant } from 'src/Config/Constant';
import { Product } from 'src/app/models/signin-signup.model';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  ProductData !: Product;
  isLoading: boolean = true;
  ProductImage: any;
  productName !:string;
  clickcount: number = 1;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _db: FirebaseDataService) {
    
  }

  ngOnInit(): void {
    this.productName=this._Activatedroute.snapshot.params["ProductId"];
  
    let dataUser: DataGet =
    {
      basePath: Constant.database.baseName,
      tableName: Constant.database.productData,
      itemName: this.productName
    }

    const getordersPromise: Promise<any>[] = [];

    const promise=this._db.getProperty(dataUser);
     getordersPromise.push(promise);
     Promise.all(getordersPromise).then((value) => {
      this.ProductData = value[0] as Product;
      console.log(this.ProductData);
      this.ProductImage=this.ProductData.ProductImages.split(',')[0]
     })
    setTimeout(() => {
      this.isLoading = false; // Set to false when data loading is complete
    }, 3000); // Simulating 2 seconds of loading time
  }
  
  scrollPreview() {
    const images=this.ProductData.ProductImages.split(',');
    this.ProductImage = images[this.clickcount];
    this.clickcount++;
    if (this.clickcount >= images.length) {
      this.clickcount = 0;
    }
  }
}
