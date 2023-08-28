import { Component, OnInit } from "@angular/core";
import { DataGet, DataInsert } from "src/app/models/file-upload.model";
import { Constant } from "src/Config/Constant";
import { errorMessage } from "src/Config/errorMessage";
import {
  Category,
  ConfigData,
  Headings,
  Manufacture,
  Product,
} from "src/app/models/signin-signup.model";
import { FirebaseDataService } from "src/app/services/firebase-data.service";

@Component({
  selector: "app-add-manufacture-category",
  templateUrl: "./add-manufacture-category.component.html",
  styleUrls: ["./add-manufacture-category.component.css"],
})
export class AddManufactureCategoryComponent implements OnInit {
  
  //#region Property
  isuploading: boolean = true;
  brandName!: string;
  categoryName!: string;
  categoryPhonenumber!: string;

  manufactureName!: string;
  manufactureNumber!: string;

  headingName!: string;
  subheadingname!: string;

  categoryError: string = "";
  manfactureError: string = "";
  headingerror: string = "";

  ManfactureDetails: Manufacture[] = [];
  CategoryDetails: Category[] = [];
  HeadingDetails: Headings[] = [];

  isuploadBrand: boolean = true;
  isDeleteBrand: boolean = true;

  isuploadManfacture: boolean = true;
  isDeleteManfacture: boolean = true;

  isheadingadded: boolean = true;
  isheadingDelete: boolean = true;

  configdetails!: ConfigData;
//#endregion
  
constructor(private _db: FirebaseDataService) { }

  ngOnInit(): void {
    const dataUser: DataGet = {
      basePath: Constant.database.baseName,
      tableName: Constant.database.ConfigData,
      itemName: "",
    };

    this._db.getAll(dataUser).then(
      (value) => {
        this.configdetails = value as ConfigData;
        this.CategoryDetails = this.configdetails?.Category || [];
        this.ManfactureDetails = this.configdetails?.Manufacture || [];
        this.HeadingDetails = this.configdetails?.Heading || [];
      },
      (error) => {
        console.error(error);
      }
    );

    setTimeout(() => {
      this.isuploading = false;
    }, 3000);
  }

  //#region AddItems
  addItemIfNotExists<T>(
    itemList: T[],
    newItem: T,
    comparisonFunction: (a: T, b: T) => boolean
  ): void {
    if (!itemList.some((item) => comparisonFunction(item, newItem))) {
      itemList.push(newItem);
    }
  }

  addBrand(): void {
    const newCategory: Category = {
      BrandName: this.brandName,
      CategoryName: this.categoryName,
      CategoryPhoneNUmber: this.categoryPhonenumber,
    };

    this.addItemIfNotExists(
      this.CategoryDetails,
      newCategory,
      (a, b) => a.BrandName === b.BrandName && a.CategoryName === b.CategoryName
    );
    this.isuploadBrand = false;
    this.clearAddForm();
  }
  addManufacture(): void {
    const newManufacture: Manufacture = {
      ManufactureName: this.manufactureName,
      ManufacturetNumber: this.manufactureNumber,
    };

    this.addItemIfNotExists(
      this.ManfactureDetails,
      newManufacture,
      (a, b) =>
        a.ManufactureName === b.ManufactureName &&
        a.ManufacturetNumber === b.ManufacturetNumber
    );
    this.isuploadManfacture = false;
 
    this.clearAddForm();
  }
  addHeading(): void {
    const newHeading: Headings = {
      Heading: this.headingName,
      SubHeading: this.subheadingname,
    };

    this.addItemIfNotExists(
      this.HeadingDetails,
      newHeading,
      (a, b) => a.Heading === b.Heading && a.SubHeading === b.SubHeading
    );
    this.isheadingadded = false;
    this.clearAddForm();
  }

  clearAddForm(): void {
    this.brandName = "";
    this.categoryName = "";
    this.categoryPhonenumber = "";

    this.manufactureName = "";
    this.manufactureNumber = "";

    this.headingName = "";
    this.subheadingname = "";
  }
//#endregion
  
  //#region uploadData
uploadData(tableName: string, itemName: string, insertData: any[]): void {
    const dataInsert: DataInsert = {
      basePath: Constant.database.baseName,
      tableName: tableName,
      itemName: itemName,
      insertData: insertData,
    };

    if (this._db.writeUserData(dataInsert)) {
      window.alert(errorMessage.signup.success);
    }
  }

  UploadBrand(): void {
    this.uploadData(
      Constant.database.ConfigData,
      "Category",
      this.CategoryDetails
    );
  }

  UploadManufacture(): void {
    this.uploadData(
      Constant.database.ConfigData,
      "Manufacture",
      this.ManfactureDetails
    );
  }

  UploadHeading(): void {
    this.uploadData(
      Constant.database.ConfigData,
      "Heading",
      this.HeadingDetails
    );
  }

//#endregion

  //#region CheckBox
  onCheckboxChange(event: any, index: number, type: string, v1: string, v2: string, v3: string = ''): void {
    if (event.target.checked) {
      if (type == "Manfacture") {
        this.isDeleteManfacture = false;
        this.indexManfacture.push(index);
        this.deleteM.push({ ManufactureName: v1, ManufacturetNumber: v2 })
      }
      else if(type =='Heading')
      {
      this.isheadingDelete=false;
      this.indexHeading.push(index);
      this.deleteH.push({ Heading: v1, SubHeading: v2 })
      }
      else {
        this.isDeleteBrand = false;
        this.indexCategory.push(index);
        this.deleteC.push({ BrandName: v1, CategoryName: v2, CategoryPhoneNUmber: v3 })
        console.log(this.deleteC);
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
      else if(type =='Heading')
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

 //#endregion 
 
  //#region Delete
  indexManfacture: number[] = [];
  indexCategory: number[] = [];
  indexHeading: number[] = [];

  deleteC: Category[] = [];
  deleteM: Manufacture[] = [];
  deleteH: Headings[] = [];

  deleteItems<T>(toDelete: T[], itemList: T[]): void {
    if (toDelete.length > 0) {
      toDelete.forEach((element) => {
        const index = itemList.findIndex((item) => this.isMatch(item, element));
        if (index !== -1) {
          itemList.splice(index, 1);
        }
      });
      toDelete.length = 0;
    }
  }

  deleteBrand() {
    console.log(this.deleteC);

    if (this.deleteC.length > 0) {
      this.deleteC.forEach((element) => {
        const ind = this.CategoryDetails.findIndex(item => item.BrandName == element.BrandName && item.CategoryName == element.CategoryName);
        if (ind !== -1) {
          this.CategoryDetails.splice(ind, 1);
        }
      })
      this.deleteC = [];
      this.isuploadBrand = false;
    }
  }

  deleteManfacture(): void {
    this.deleteItems(this.deleteM, this.ManfactureDetails);
    this.isuploadManfacture = false;
  }

  deleteHeading(): void {
    this.deleteItems(this.deleteH, this.HeadingDetails);
    this.isheadingadded = false;
  }
  private isMatch(item1: any, item2: any): boolean {
    return JSON.stringify(item1) === JSON.stringify(item2);
  }
  //#endregion
}
