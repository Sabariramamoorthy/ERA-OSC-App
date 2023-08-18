import { Component, OnInit } from '@angular/core';

import { Constant } from 'src/Config/Constant';
import { DataGet } from 'src/app/models/file-upload.model';
import { Product } from 'src/app/models/signin-signup.model';
import { CustomStorageService } from 'src/app/services/custom-storage.service';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  ProductDetails !: Product[];
  showMenu: boolean = true;

  toggleMenu() {
    this.showMenu = !this.showMenu;
    console.log(this.showMenu);
    
  }
  isLoading: boolean = true;
  constructor( private customStorageService: CustomStorageService,private _db:FirebaseDataService){}
  ngOnInit(): void { 
    let dataUser : DataGet =
    {
      basePath: Constant.database.baseName,
      tableName: Constant.database.productData,
      itemName: ""
    }
    //var result=this._db.getProperty(dataGet);
    this._db.getAll(dataUser).then(
      (value) => {
        const mapped = Object.keys(value).map(key => (value[key]));
        this.ProductDetails = (mapped as Product[]).sort((a, b) => {
          return <any>new Date(b.ProductUploadDate) - <any>new Date(a.ProductUploadDate)
        });
        console.log(this.ProductDetails);
      },
      (error) => {
        console.error(error);
      }
    );
    //this.ProductDetails = this.customStorageService.getItem(Constant.localStorage.Product)
    console.log( this.ProductDetails);
    
    setTimeout(() => {
      this.isLoading = false; // Set to false when data loading is complete
    }, 3000); // Simulating 2 seconds of loading time
  }

  
}
