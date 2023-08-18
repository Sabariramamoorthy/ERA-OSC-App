import { Component, OnInit } from '@angular/core';
import { DataGet } from 'src/app/models/file-upload.model';
import { Constant } from 'src/Config/Constant';
import { BusinessData, Category, Product } from 'src/app/models/signin-signup.model';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { CustomStorageService } from 'src/app/services/custom-storage.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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


 
  constructor(private _db: FirebaseDataService, private customStorageService: CustomStorageService,private sanitizer: DomSanitizer) { }
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
  sendmessage(product:Product){
    const phoneNumber = '+919042350714'; // Replace with the desired phone number
   const message = `Hi Online Shopping Cart \n I wish to Buy:*${product.ProductName.split('-')[0]}* \n *Price*:${product.ProductPrice} \n *ProductURL*:https://myfood-app-11272.web.app/product-View/${product.ProductName.replaceAll(' ','%20')}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    console.log(message);
    
    //this._router.navigateByUrl('/uploading-gif') https://myfood-app-11272.web.app/product-View/Women%20Watches-08122023042238
    // Sanitize the URL
    const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(whatsappUrl);

    // Open the WhatsApp message link in a new window
    //window.redirect();
    window.location.href=whatsappUrl;
  }
  allsales(){

  }
}
