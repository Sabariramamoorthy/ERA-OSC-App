import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  constructor( private customStorageService: CustomStorageService,private sanitizer: DomSanitizer,private _db:FirebaseDataService){}
  ngOnInit(): void { 
    this.ProductDetails = this.customStorageService.getItem(Constant.localStorage.Product)
  
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
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
  
}
