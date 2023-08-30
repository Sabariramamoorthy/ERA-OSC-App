import { Component, OnInit } from '@angular/core';
import { DataGet } from 'src/app/models/file-upload.model';
import { CarsoulePhoto, Constant } from 'src/Config/Constant';
import { BusinessData, Category, Headings, Product } from 'src/app/models/signin-signup.model';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { CustomStorageService } from 'src/app/services/custom-storage.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = true;
  showSideNav = false;
  ProductDetails: Product[] = [];
  Brand: Category[] = [];

  carosuelPhoto !:any[];


  Topsales:Product[]=[];
  Splsales:Product[]=[];
  Newsales:Product[]=[];
  Offersales:Product[]=[];
  Restocksales:Product[]=[];

  TopsalesH: Headings = { Heading: '', SubHeading: '' };
  SplsalesH:Headings= { Heading: '', SubHeading: '' };
  NewsalesH:Headings= { Heading: '', SubHeading: '' };
  OffersalesH:Headings= { Heading: '', SubHeading: '' };
  RestocksalesG:Headings= { Heading: '', SubHeading: '' };


  Headings:Headings[] =[]

  constructor(
    private _db: FirebaseDataService,
    private customStorageService: CustomStorageService,
    private sanitizer: DomSanitizer,
    private _session:LocalstorageService
  )
   {
  this.carosuelPhoto=CarsoulePhoto;
  if(this._session.getData("loaded")){
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
  }

  ngOnInit(): void {
    this._session.setData("loaded",true);
    this.fetchData();
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  fetchData() {
    const dataUser: DataGet = {
      basePath: Constant.database.baseName,
      tableName: Constant.database.productData,
      itemName: ''
    };
    this._db.getAlldata(dataUser).then(
      (value) => {
        this.ProductDetails = (Object.keys(value.ProductTable).map(key => (value.ProductTable[key])) as Product[]).sort((a, b) => {
          return <any>new Date(b.ProductUploadDate) - <any>new Date(a.ProductUploadDate)
        });

        this.Headings= value.ConfigtTable;

        this.customStorageService.clear();
        this.customStorageService.setItem(
          Constant.localStorage.Product,
          this.ProductDetails
        );
        this.customStorageService.setItem(
          Constant.localStorage.configTable,
          value.ConfigtTable
        );

        console.log( this.ProductDetails);
        

        
        this.Headings= value.ConfigtTable.Heading;
        this.TopsalesH =this.Headings[0];
        this.SplsalesH=this.Headings[1];
        this. NewsalesH=this.Headings[2];
        this. OffersalesH=this.Headings[3];
        this.RestocksalesG=this.Headings[4];

        this.Topsales = this.filterHedaings( this.TopsalesH.Heading);
        this.Splsales=this.filterHedaings( this.SplsalesH.Heading);
        this.Newsales=this.filterHedaings( this. NewsalesH.Heading);
        this.Offersales=this.filterHedaings(this. OffersalesH.Heading);
        this.Restocksales=this.filterHedaings(this.RestocksalesG.Heading);

        

      },
      (error) => {
        console.error(error);
      }
    );
  }


filterHedaings(filter:string):any{
return this.ProductDetails.filter(item => item.ProductHeading === filter).slice(0,6);
}
  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  sendmessage(product: Product) {
    const phoneNumber = '+919042350714';
    const message = `Hi Online Shopping Cart \n I wish to Buy: *${product.ProductName.split('-')[0]}* \n *Price*: ${product.ProductPrice} \n *ProductURL*: https://myfood-app-11272.web.app/product-View/${product.ProductName.replaceAll(' ', '%20')}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(whatsappUrl);

    window.location.href = whatsappUrl;
  }


}
