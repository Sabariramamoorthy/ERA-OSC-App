import { Component, OnInit } from '@angular/core';
import { DataGet } from 'src/app/models/file-upload.model';
import { Constant } from 'src/Config/Constant';
import { BusinessData, Category, Product } from 'src/app/models/signin-signup.model';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { CustomStorageService } from 'src/app/services/custom-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = true;
  showSideNav: boolean = false;
  ProductDetails: Product[] = [];
  Brand: Category[] = [];



  constructor(private _db: FirebaseDataService, private customStorageService: CustomStorageService) { }
  ngOnInit(): void {
    let dataUser: DataGet =
    {
      basePath: Constant.database.baseName,
      tableName: Constant.database.productData,
      itemName: ""
    }
    this._db.getAlldata(dataUser).then(
      (value) => {
        this.ProductDetails = (Object.keys(value.ProductTable).map(key => (value.ProductTable[key])) as Product[]).sort((a, b) => {
          return <any>new Date(b.ProductUploadDate) - <any>new Date(a.ProductUploadDate)
        });

        this.Brand = (Object.keys(value.ConfigtTable.Category).map(key => (value.ConfigtTable.Category[key])));
        this.customStorageService.setItem(Constant.localStorage.Product, this.ProductDetails);
        this.customStorageService.setItem(Constant.localStorage.Manufacture,
          (Object.keys(value.ConfigtTable.Manufacture).
            map(key => (value.ConfigtTable.Manufacture[key]))));
        this.customStorageService.setItem(Constant.localStorage.Brand, this.Brand);

        //console.log(this.customStorageService.getItem(Constant.localStorage.Manufacture));
        console.log(this.ProductDetails, this.Brand);


      },
      (error) => {
        console.error(error);
      }
    );



    setTimeout(() => {
      this.isLoading = false; // Set to false when data loading is complete
    }, 3000);
  }


  clickCategory(){
    console.log("category");
    
  }
  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }
}
