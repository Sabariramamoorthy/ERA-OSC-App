import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Constant } from 'src/Config/Constant';
import { errorMessage } from 'src/Config/errorMessage';
import { DataInsert, Fileupload, imageCompress } from 'src/app/models/file-upload.model';
import { ConfigData, Product } from 'src/app/models/signin-signup.model';
import { CompressFileService } from 'src/app/services/compress-file.service';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { FirebaseFileService } from 'src/app/services/firebase-file.service';
import { CustomStorageService } from 'src/app/services/custom-storage.service';

@Component({
  selector: 'app-product-post',
  templateUrl: './product-post.component.html',
  styleUrls: ['./product-post.component.css']
})
export class ProductPostComponent {
  isuploading = false;
  FormFlag = true;
  PreviewFlag = false;

  ProductImages: any[] = [];
  ProductImage!: any;

  ProductData!: Product;
  configdetails!: ConfigData;

  dateNow !: any;

  Catergorysuggestions: string[] = [];
  Brandsuggestions: string[] = [];
  Manufacturesuggestions: string[] = [];
  Headingsuggestions: string[] = [];
  OrderTypesuggestions: string[] = [];
  Offersuggestions: string[] = ['Yes','No'];

  ProductForm = new FormGroup({
    ProductName: new FormControl('', [Validators.required, Validators.minLength(8)]),
    ProductPrice: new FormControl('', [Validators.required]),
    ProductBrand: new FormControl('', [Validators.required]),
    ProductCatergory: new FormControl('', [Validators.required]),
    ProductManufacture: new FormControl('', [Validators.required]),
    ProductHeading: new FormControl('', [Validators.required]),
    ProductOrderType: new FormControl('', [Validators.required]),
    ProductShipping: new FormControl('', [Validators.required]),
    ProductDetails: new FormControl('', [Validators.required]),
    ProductOtherDetails: new FormControl('', [Validators.required]),
    ProductStock: new FormControl('', [Validators.required]),
    ProductIsOffer: new FormControl('', [Validators.required]),
    // ProductOfferPrice: new FormControl('', [Validators.required]),
    ProductOfferDiscount: new FormControl('', [Validators.required]),
    ProductImages: new FormControl('', [Validators.required]),
  });
  compressedImage: any[] = [];
  compressedBlob: any[] = [];
  clickcount: any;

  constructor(
    private customStorageService: CustomStorageService,
    private _db: FirebaseDataService,
    private _compress: CompressFileService,
    private _router: Router,
    private _fileService: FirebaseFileService,
    private location: Location
  ) {
    this.ProductForm.invalid;
    this.loadConfigDetails();
  }

  private loadConfigDetails(): void {
  
    this.configdetails=this.customStorageService.getItem(Constant.localStorage.configTable);

    this.Brandsuggestions =  this.configdetails.Category.map((element) => element.BrandName);
    this.Brandsuggestions = Array.from(new Set(this.Brandsuggestions));

    this.Catergorysuggestions = this.configdetails.Category.map((element) => element.CategoryName);
    this.Catergorysuggestions = Array.from(new Set(this.Catergorysuggestions));

    this.Manufacturesuggestions = this.configdetails.Manufacture.map((element) => element.ManufactureName);
    this.Manufacturesuggestions = Array.from(new Set(this.Manufacturesuggestions));

    this.Headingsuggestions=this.configdetails.Heading.map((element) => element.Heading);
    this.Headingsuggestions = Array.from(new Set(this.Headingsuggestions));

    this.OrderTypesuggestions = ['Whatsapp','Direct'];
  
  }

  get f() {
    return this.ProductForm.controls;
  }

  // onchange()
  // {
  //   this.Catergorysuggestions= this.configdetails.Category.filter((item) => item.BrandName==inputName).map((element) => element.CategoryName);
  //   this.Catergorysuggestions = Array.from(new Set(this.Catergorysuggestions));
  // }
  async detectFiles(event: any) {
    const compressPromises: Promise<void>[] = [];
    let files = event.target.files;
    if (files) {
      this.ProductImages = [...files];
      this.compressedImage = [];
      this.compressedBlob = [];
      for (const element of this.ProductImages) {
        const value: imageCompress = await this._compress.compressImage(element, 50, 50);
        this.compressedImage.push(value.compressedData);
        this.compressedBlob.push(value.compressedBlob);
        compressPromises.push(Promise.resolve());
      }
      this.FormFlag = false;
    }
  }

  scrollPreview() {
    this.ProductImage = this.compressedImage[this.clickcount];
    this.clickcount = (this.clickcount + 1) % this.compressedImage.length;
  }

  async Upload() {
    this.isuploading = true;
    let now = new Date();
    this.dateNow = formatDate(now, Constant.dateFormat.string, Constant.dateFormat.lan, Constant.dateFormat.zone);
    this.ProductData.ProductUploadDate = this.dateNow;
    this.ProductData.ProductOfferPrice= ((parseInt(this.ProductData.ProductOfferDiscount)/100)*parseInt(this.ProductData.ProductPrice)).toString()
    this.ProductData.ProductName = `${this.ProductData.ProductName}-${this.dateNow.split(' ')[0].replaceAll('-', '')}${this.dateNow.split(' ')[1].replaceAll(':', '')}`;
    const FileUploadPromise: Promise<string>[] = [];
    
    for (let index = 0; index < this.compressedBlob.length; index++) {
      const ProductImageinstance = {
        BasePath: Constant.database.baseName,
        pageName: this.ProductData.ProductCatergory,
        fileName: `${this.ProductData.ProductName}-${index}.webp`,
        file: this.compressedBlob[index]
      } as Fileupload;
      const ProductImagePromise = this._fileService.uploadFile(ProductImageinstance);
      FileUploadPromise.push(ProductImagePromise);
    }

    const content = await Promise.all(FileUploadPromise);

    this.ProductData.ProductImages = content.toString();
    this.ProductData.ProductOrderCount = Constant.flag.null;
    const dataInsert: DataInsert = {
      basePath: Constant.database.baseName,
      tableName: Constant.database.productData,
      itemName: this.ProductData.ProductName,
      insertData: this.ProductData
    };

    if (this._db.writeUserData(dataInsert) == Constant.flag.true) {
      window.alert(errorMessage.signup.success);
      this.ProductForm.reset();
      this.ProductImage = [];
      this.PreviewFlag = false;
      this.isuploading = false;
    }
  }

  preView() {
    this.PreviewFlag = true;
    this.ProductData = this.ProductForm.value as Product;
    this.ProductImage = this.compressedImage[0];
  }
}
