import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataGet } from 'src/app/models/file-upload.model';
import { CarsoulePhoto, Constant } from 'src/Config/Constant';
import { Product } from 'src/app/models/signin-signup.model';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { CustomStorageService } from 'src/app/services/custom-storage.service';

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
  photos :any[]=[]
  RelatedProduct:any[]=[]
  //RelatedBrand:any[]=[]

  stock!:string;
  shareData:any;
  clickcount: number = 1;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private customStorageService:CustomStorageService) {
      
  }

  ngOnInit(): void {
    this.productName=this._Activatedroute.snapshot.params["ProductId"];
    this.ProductData=(this.customStorageService.getItem(Constant.localStorage.Product) as Product[]).find((item) => item.ProductName === this.productName) as Product;
    
    this.ProductData.ProductImages.split(',').forEach((item) => {
      this.photos.push({
        url:item
      })
    })

  this.RelatedProduct=(this.customStorageService.getItem(Constant.localStorage.Product) as Product[]).filter((item) => item.ProductCatergory == this.ProductData.ProductCatergory).slice(0,6) as Product[];
  //this.RelatedBrand=(this.customStorageService.getItem(Constant.localStorage.Product) as Product[]).filter((item) => item.ProductBrand == this.ProductData.ProductBrand).slice(0,6) as Product[];
  
  
    this.stock=parseInt(this.ProductData.ProductStock)>0 ? 'Available':'Out of Stock'
   
    this.shareData = {
      title: "Online Shopping Cart",
      text: this.productName,
      url: `https://myfood-app-11272.web.app/product-View/${this.ProductData.ProductName.replaceAll(' ', '%20')}`,
    };
    setTimeout(() => {
      this.isLoading = false; 
    }, 3000); 
  }
  
  async share()
  {
    await navigator.share(this.shareData);
  }
  
}
