import { Location, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/Config/Constant';
import { errorMessage } from 'src/Config/errorMessage';
import { DataGet, DataInsert, Fileupload, imageCompress } from 'src/app/models/file-upload.model';
import { Category, ConfigData, Manufacture, Product, SignIn, SignUp } from 'src/app/models/signin-signup.model';
import { CompressFileService } from 'src/app/services/compress-file.service';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { FirebaseFileService } from 'src/app/services/firebase-file.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-product-post',
  templateUrl: './product-post.component.html',
  styleUrls: ['./product-post.component.css']
})

export class ProductPostComponent {
  isuploading :boolean =false;
  ProductForm = new FormGroup({
    ProductName: new FormControl('', [Validators.required, Validators.minLength(8)]),
    ProductPrice: new FormControl('', [Validators.required]),
    ProductBrand: new FormControl('', [Validators.required]),
    ProductCatergory: new FormControl('', [Validators.required]),
    ProductManufacture:new FormControl('', [Validators.required]),
    ProductShipping: new FormControl('', [Validators.required]),
    ProductDetails: new FormControl('', [Validators.required]),
    ProductOtherDetails: new FormControl('', [Validators.required]),
    ProductStock: new FormControl('', [Validators.required]),
    ProductIsOffer: new FormControl('', [Validators.required]),
    ProductOfferPrice: new FormControl('', [Validators.required]),
    ProductOfferDiscount: new FormControl('', [Validators.required]),
    ProductImages:  new FormControl('', [Validators.required]),  
  });

  

  ProductImages: any[] = [];
  ProductImage !: any ;
  signInData !: SignIn;
  ProductData !:Product;

  FormFlag:boolean=true;
  PreviewFlag:boolean=false;
  ManfactureDetails: Manufacture[] = []
  CategoryDetails: Category[] = []
  configdetails !:ConfigData;
  dateNow: any = Date.now();


  constructor(private _localstorage: LocalstorageService,
     private _db: FirebaseDataService,
     private _compress:CompressFileService, 
     private _router:Router,
     private _fileService:FirebaseFileService,
     private location:Location) 
     {
     this.ProductForm.invalid
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

     let now = new Date();
     this.dateNow = formatDate(now, Constant.dateFormat.string, Constant.dateFormat.lan, Constant.dateFormat.zone)
     }

  get f() {
    return this.ProductForm.controls;
  }


  compressedImage :any[]=[];
  compressedBlob :any[]=[];
  async detectFiles(event: any) {
    
    const compressPromises: Promise<void>[] = [];
    let files = event.target.files;
    if (files) {
      this.ProductImages=[...files]
      this.ProductImages.forEach(element => {
      const ImageCompressPromise = this._compress.compressImage(element, 50, 50);
      ImageCompressPromise.then((value: imageCompress) => {
        this.compressedImage.push(value.compressedData) ;
        this.compressedBlob.push(value.compressedBlob) ;
      })
      compressPromises.push(ImageCompressPromise);
      });
    //console.log("FormFlag", this.FormFlag);

    Promise.all(compressPromises).then((value) => {
      this.FormFlag=false;
      //console.log(" FormFlag:", this.FormFlag);  
      //console.log(this.compressedImage);
    });
      
      }
    }
  
  clickcount :number=1;
  scrollPreview(){
      this.ProductImage=this.compressedImage[this.clickcount];
      this.clickcount ++;
      if(this.clickcount >=this.compressedImage.length)
      {
        this.clickcount=0;
      }
  }
 
  Upload(){
    this.isuploading=true;
    this.ProductData.ProductUploadDate=this.dateNow;
    this.ProductData.ProductName= `${this.ProductData.ProductName}-${this.dateNow.split(" ")[0].replaceAll('-','')}${this.dateNow.split(" ")[1].replaceAll(':','')}`
    const FileUploadPromise: Promise<string>[] = [];

    this.compressedBlob.forEach((item, index) => {
      //console.log(item);
      
      let ProductImageinstance = {
        BasePath: Constant.database.baseName,
        pageName: this.ProductData.ProductCatergory,
        fileName:`${this.ProductData.ProductName}-${index}.png`,
        file: item//file
      } as Fileupload;
      const ProductImagePromise = this._fileService.uploadFile(ProductImageinstance);
      FileUploadPromise.push(ProductImagePromise);
      });


      Promise.all(FileUploadPromise).then((content) => {

        
        //console.log(content);
        this.ProductData.ProductImages=content.toString();
        this.ProductData.ProductOrderCount=Constant.flag.null;
        let dataInsert: DataInsert =
        {
          basePath: Constant.database.baseName,
          tableName: Constant.database.productData,
          itemName:this.ProductData.ProductName,
          insertData: this.ProductData
        }
        if (this._db.writeUserData(dataInsert) == Constant.flag.true) {
          window.alert(errorMessage.signup.success)
          this.ProductForm.reset();
          this.PreviewFlag=false;
          this.isuploading=false;
        }

      })

    
   
  }
  async preView() {
    this.PreviewFlag=true;
    this.ProductData = this.ProductForm.value as Product
    this.ProductImage=this.compressedImage[0];
    //console.log(this.ProductData);
  }


}


