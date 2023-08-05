import { Component } from '@angular/core';
import { DataGet, DataInsert } from 'src/app/models/file-upload.model';
import { Constant } from 'src/Config/Constant';
import { errorMessage } from 'src/Config/errorMessage';
import { Category, ConfigData, Manufacture, Product } from 'src/app/models/signin-signup.model';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-add-manufacture-category',
  templateUrl: './add-manufacture-category.component.html',
  styleUrls: ['./add-manufacture-category.component.css']
})
export class AddManufactureCategoryComponent {
  brandName !: string;
  categoryName !: string;
  manufactureName !: string;
  manufactureNumber !: string;
  categoryError !:string;
  manfactureError !:string;
  ManfactureDetails: Manufacture[] = []
  CategoryDetails: Category[] = []

  configdetails !:ConfigData;
  constructor(private _db: FirebaseDataService) {


    let dataUser : DataGet =
    {
      basePath: Constant.database.baseName,
      tableName: Constant.database.ConfigData,
      itemName: ""
    }
    //var result=this._db.getProperty(dataGet);
    this._db.getAll(dataUser).then(
      (value) => {
        this.configdetails = value as ConfigData
        this.CategoryDetails=this.configdetails.Category;
        this.ManfactureDetails=this.configdetails.Manufacture;    
      },
      (error) => {
        console.error(error);
      }
    );

  }

  addManufacture() {

    if (this.manufactureName != null && this.manufactureNumber != null) {
      if (this.ManfactureDetails.find((m) => m.ManufactureName === this.manufactureName 
      && m.ManufacturetNumber === this.manufactureNumber) == undefined) 
      {
        this.ManfactureDetails.push({
          ManufactureName: this.manufactureName,
          ManufacturetNumber: this.manufactureNumber
        })
        let dataInsert: DataInsert =
        {
          basePath: Constant.database.baseName,
          tableName: Constant.database.ConfigData,
          itemName: "Manufacture",
          insertData: this.ManfactureDetails
        }
        this._db.writeUserData(dataInsert);
      }
      else{
        this.manfactureError="Existing Manfacture"
      }
    }


  }


  addBrand() {
    if (this.brandName != null && this.categoryName != null) {      
      if (this.CategoryDetails.find((m) => m.BrandName == this.brandName && m.CategoryName == this.categoryName) == undefined) 
      {
        this.CategoryDetails.push({
          BrandName: this.brandName,
          CategoryName: this.categoryName
        })
        console.log(this.CategoryDetails);
        
        let dataInsert: DataInsert =
        {
          basePath: Constant.database.baseName,
          tableName: Constant.database.ConfigData,
          itemName: "Category",
          insertData: this.CategoryDetails
        }
        this._db.writeUserData(dataInsert);
      }
      else{
        this.categoryError="Existing Brand & Category"
      }
    }
  }

  updatedata() {

  }

}
