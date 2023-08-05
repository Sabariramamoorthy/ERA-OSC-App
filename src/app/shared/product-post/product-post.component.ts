import { Location, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/Config/Constant';
import { errorMessage } from 'src/Config/errorMessage';
import { DataGet, DataInsert, Fileupload, imageCompress } from 'src/app/models/file-upload.model';
import { Product, SignIn, SignUp } from 'src/app/models/signin-signup.model';
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

  ProductForm = new FormGroup({
    ProductName: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9 ]*')]),
    ProductPrice: new FormControl('', [Validators.required]),
    ProductCatergory: new FormControl('', [Validators.required]),
    ProductManufacture:new FormControl('', [Validators.required]),
    ProductShipping: new FormControl('', [Validators.required]),
    ProductDetails: new FormControl('', [Validators.required]),
    ProductOtherDetails: new FormControl('', [Validators.required]),
    ProductImages:  new FormControl('', [Validators.required]),  
  });

  SignInform = new FormGroup({
    ProductName: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9 ]*')]),
    ProductPrice: new FormControl('', [Validators.required, Validators.minLength(6)]),
    Role: new FormControl('', [Validators.required]),
  });

  ProductImages: any[] = [];
  ProductImage: any;
  signInData !: SignIn;
  ProductData !:Product;

  FormFlag:boolean=true;
  ProductCatergory :any[]=["Manufacture1","Manufacture2","Manufacture3","Manufacture4"]

  signRole: string = "Select the Role";
  dateNow: any = Date.now();


  constructor(private _localstorage: LocalstorageService,
     private _db: FirebaseDataService,
     private _compress:CompressFileService, 
     private _router:Router,
     private _fileService:FirebaseFileService,
     private location:Location) {
     this.ProductForm.invalid
     let now = new Date();
     let dataUser : DataGet =
    {
      basePath: Constant.database.baseName,
      tableName: Constant.database.signUpData,
      itemName: ""
    }


     this._db.getAll(dataUser).then(
      (value) => {
        const mapped = Object.keys(value).map(key => (value[key]));
        //console.log(  mapped as Product[]);
      },
      (error) => {
        console.error(error);
      }
    );

     this.dateNow = formatDate(now, Constant.dateFormat.string, Constant.dateFormat.lan, Constant.dateFormat.zone)
  }

  get f() {
    return this.ProductForm.controls;
  }

  get f1() {
    return this.SignInform.controls;
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
    
    this.ProductData.ProductUploadDate=this.dateNow;

    const FileUploadPromise: Promise<string>[] = [];

    this.compressedBlob.forEach((item, index) => {
      //console.log(item);
      
      let ProductImageinstance = {
        BasePath: Constant.database.baseName,
        orderFolder: this.ProductData.ProductName,
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
        let dataInsert: DataInsert =
        {
          basePath: Constant.database.baseName,
          tableName: Constant.database.signUpData,
          itemName:this.ProductData.ProductName,
          insertData: this.ProductData
        }
        if (this._db.writeUserData(dataInsert) == Constant.flag.true) {
          window.alert(errorMessage.signup.success)
          this.ProductForm.reset();
          this.ProductData = this.ProductForm.value as Product
        }
      })

    
   
  }
  async preView() {
    this.ProductData = this.ProductForm.value as Product
    this.ProductImage=this.compressedImage[0];
    //console.log(this.ProductData);


  }
  
  

}


