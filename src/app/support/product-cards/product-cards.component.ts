import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/signin-signup.model';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent {
  @Input() products: Product[] = [];
  @Input() load:string="eager";
  constructor(
    private sanitizer: DomSanitizer,
    private _router:Router
  ) {
    //console.log(this.products);
    
  }
  preview(P:Product)
  {
    this._router.navigate(['/', 'product-View',P.ProductName])
  }
  sendmessage(product: Product) {
    const phoneNumber = '+919042350714';
    const message = `Hi Online Shopping Cart \n I wish to Buy: *${product.ProductName.split('-')[0]}* \n *Price*: ${product.ProductPrice} \n *ProductURL*: https://myfood-app-11272.web.app/product-View/${product.ProductName.replaceAll(' ', '%20')}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(whatsappUrl);

    window.location.href = whatsappUrl;
  }
}
