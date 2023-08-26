import { Component, OnInit } from '@angular/core';
import { DataGet, DataInsert } from 'src/app/models/file-upload.model';
import { Constant } from 'src/Config/Constant';
import { errorMessage } from 'src/Config/errorMessage';
import { Category, ConfigData, Headings, Manufacture, Product } from 'src/app/models/signin-signup.model';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-add-manufacture-category',
  templateUrl: './add-manufacture-category.component.html',
  styleUrls: ['./add-manufacture-category.component.css']
})
export class AddManufactureCategoryComponent implements OnInit {
  isuploading: boolean = true;

  brandName !: string;
  categoryName !: string;
  categoryPhonenumber!: string;

  manufactureName !: string;
  manufactureNumber !: string;

  headingName !: string;
  subheadingname !:string;

  categoryError: string = '';
  manfactureError: string = '';
  headingerror:string='';


  ManfactureDetails: Manufacture[] = []
  CategoryDetails: Category[] = []
  HeadingDetails: Headings[] = []


  isuploadBrand: boolean = true;
  isDeleteBrand: boolean = true;

  isuploadManfacture: boolean = true;
  isDeleteManfacture: boolean = true;

  isheadingadded:boolean=true;
  isheadingDelete:boolean=true;

  configdetails !: ConfigData;
  constructor(private _db: FirebaseDataService) { }
  ngOnInit(): void {
    let dataUser: DataGet =
    {
      basePath: Constant.database.baseName,
      tableName: Constant.database.ConfigData,
      itemName: ""
    }

    //var result=this._db.getProperty(dataGet);
    this._db.getAll(dataUser).then(
      (value) => {
        this.configdetails = value as ConfigData

        if (this.configdetails?.Category != null) {
          this.CategoryDetails = this.configdetails.Category;
          //this. CategorypageChanged({ page: this.CategorycurrentPage });
        }
        // this.CategorytotalItems=this.CategoryDetails.length;


        if (this.configdetails?.Manufacture != null) {
          this.ManfactureDetails = this.configdetails.Manufacture;
          //this.ManfacturepageChanged({ page: this.ManfacturecurrentPage });
        }
        // this.ManfacturetotalItems=this.ManfactureDetails.length;

        if (this.configdetails?.Heading != null) {
          this.HeadingDetails = this.configdetails.Heading;
          //this.ManfacturepageChanged({ page: this.ManfacturecurrentPage });
        }

        console.log(this.configdetails);

      },
      (error) => {
        console.error(error);
      }
    );

    setTimeout(() => {
      this.isuploading = false; // Set to false when data loading is complete
    }, 3000);
  }

  itemsPerPage = 15;

  CategorycurrentPage = 1;
  CategorytotalItems !: number;

  ManfacturecurrentPage = 1;
  ManfacturetotalItems !: number;


  CategorypageChanged(event: any): void {
    const startIndex = (event.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.CategoryDetails = this.CategoryDetails.slice(startIndex, endIndex);
  }

  ManfacturepageChanged(event: any): void {
    const startIndex = (event.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.ManfactureDetails = this.ManfactureDetails.slice(startIndex, endIndex);
  }


  addHeading() {
console.log("sales");

    if (this.headingName != null && this.subheadingname != null) {
      if (this.HeadingDetails.find((m) => m.Heading === this.headingName
        && m.SubHeading === this.subheadingname) == undefined) {
        this.isheadingadded = false;

        this.headingerror = '';
        this.HeadingDetails.push({
          Heading: this.headingName,
          SubHeading: this.subheadingname
        })
      }
      else {
        this.headingerror = "Existing Heading"
      }
    }
  }

  UploadHeading() {
    let dataInsert: DataInsert =
    {
      basePath: Constant.database.baseName,
      tableName: Constant.database.ConfigData,
      itemName: "Heading",
      insertData: this.HeadingDetails
    }
    if (this._db.writeUserData(dataInsert)) {
      window.alert(errorMessage.signup.success)
      //location.reload();
    }
  }




  addManufacture() {

    if (this.manufactureName != null && this.manufactureNumber != null) {
      if (this.ManfactureDetails.find((m) => m.ManufactureName === this.manufactureName
        && m.ManufacturetNumber === this.manufactureNumber) == undefined) {
        this.isuploadManfacture = false;

        this.manfactureError = '';
        this.ManfactureDetails.push({
          ManufactureName: this.manufactureName,
          ManufacturetNumber: this.manufactureNumber
        })
      }
      else {
        this.manfactureError = "Existing Manfacture"
      }
    }
  }

  UploadManufacture() {
    let dataInsert: DataInsert =
    {
      basePath: Constant.database.baseName,
      tableName: Constant.database.ConfigData,
      itemName: "Manufacture",
      insertData: this.ManfactureDetails
    }
    if (this._db.writeUserData(dataInsert)) {
      window.alert(errorMessage.signup.success)
      //location.reload();
    }
  }

  addBrand() {
    if (this.brandName != null && this.categoryName != null) {
      if (this.CategoryDetails.find((m) => m.BrandName == this.brandName && m.CategoryName == this.categoryName) == undefined) {
        this.isuploadBrand = false;
        this.categoryError = '';
        this.CategoryDetails.push({
          BrandName: this.brandName,
          CategoryName: this.categoryName,
          CategoryPhoneNUmber: this.categoryPhonenumber
        })
        //console.log(this.CategoryDetails);


      }
      else {
        this.categoryError = "Existing Brand & Category"
      }
    }
  }

  UploadBrand() {
    let dataInsert: DataInsert =
    {
      basePath: Constant.database.baseName,
      tableName: Constant.database.ConfigData,
      itemName: "Category",
      insertData: this.CategoryDetails
    }
    if (this._db.writeUserData(dataInsert)) {
      window.alert(errorMessage.signup.success)
      //location.reload();
    }
  }

  onCheckboxChange(event: any, index: number, type: string, v1: string, v2: string, v3: string = ''): void {
    if (event.target.checked) {
      if (type == "Manfacture") {
        this.isDeleteManfacture = false;
        this.indexManfacture.push(index);
        this.deleteM.push({ ManufactureName: v1, ManufacturetNumber: v2 })
      }
      else if('Heading')
      {
      this.isheadingDelete=false;
      this.indexHeading.push(index);
      this.deleteH.push({ Heading: v1, SubHeading: v2 })
      }
      else {
        this.isDeleteBrand = false;
        this.indexCategory.push(index);
        this.deleteC.push({ BrandName: v1, CategoryName: v2, CategoryPhoneNUmber: v3 })
      }
    }
    else {
      if (type == "Manfacture") {
        this.isDeleteManfacture = false;
        const ind = this.indexManfacture.findIndex(item => item == index);
        if (ind !== -1) {
          this.indexManfacture.splice(ind, 1);
          this.deleteM.splice(ind, 1);
        }

        //console.log("this.indexManfacture",this.indexManfacture);

        this.indexManfacture.length == 0 ? this.isDeleteManfacture = true : this.isDeleteManfacture = false
      }
      else if('Heading')
      {
      this.isheadingDelete=false;
      const ind = this.indexHeading.findIndex(item => item == index);
        if (ind !== -1) {
          this.indexHeading.splice(ind, 1);
          this.deleteH.splice(ind, 1);
        }

        //console.log("this.indexManfacture",this.indexManfacture);

        this.indexHeading.length == 0 ? this.isheadingDelete = true : this.isheadingDelete = false
      }

      else {
        this.isDeleteBrand = false;
        const ind = this.indexCategory.findIndex(item => item == index);
        if (ind !== -1) {
          this.indexCategory.splice(ind, 1);
          this.deleteC.splice(ind, 1);
        }
        this.indexCategory.length == 0 ? this.isDeleteBrand = true : this.isDeleteBrand = false
      }

    }

    //console.log("indexManfacture:", this.indexManfacture, "indexCategory:", this.indexCategory);
  }
  indexManfacture: number[] = [];
  indexCategory: number[] = [];
  indexHeading: number[] = [];

  deleteC: Category[] = [];
  deleteM: Manufacture[] = [];
  deleteH: Headings[] = [];

  deleteBrand() {
    console.log(this.deleteC);

    if (this.deleteC.length > 0) {
      this.deleteC.forEach((element) => {
        const ind = this.CategoryDetails.findIndex(item => item.BrandName == element.BrandName && item.CategoryName == element.CategoryName);
        console.log("ind:", ind);
        if (ind !== -1) {
          this.CategoryDetails.splice(ind, 1);
        }
      })
      this.deleteC = [];
      this.isuploadBrand = false;
    }
  }
  deleteManfacture() {
    if (this.deleteM.length > 0) {
      this.deleteM.forEach((element) => {
        const ind = this.ManfactureDetails.findIndex(item => item.ManufactureName == element.ManufactureName && item.ManufacturetNumber == element.ManufacturetNumber);
        if (ind !== -1) {
          this.ManfactureDetails.splice(ind, 1);
        }
      })
      this.deleteM = [];
      this.isuploadManfacture = false;
    }
  }

  deleteHeading() {
    if (this.deleteH.length > 0) {
      this.deleteH.forEach((element) => {
        const ind = this.HeadingDetails.findIndex(item => item.Heading == element.Heading && item.SubHeading == element.SubHeading);
        if (ind !== -1) {
          this.HeadingDetails.splice(ind, 1);
        }
      })
      this.deleteH = [];
      this.isheadingadded = false;
    }
  }
}
