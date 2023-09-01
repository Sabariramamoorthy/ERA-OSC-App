import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/Config/Constant';
import {
  Category,
  ConfigData,
  Product,
} from 'src/app/models/signin-signup.model';
import { CustomStorageService } from 'src/app/services/custom-storage.service';

@Component({
  selector: 'app-categoryshopping',
  templateUrl: './categoryshopping.component.html',
  styleUrls: ['./categoryshopping.component.css'],
})
export class CategoryshoppingComponent implements OnInit {
  Brandsuggestions: any[] = [];
  isLoading: boolean = true;
  ProductDetails!: Product[];
  result!: Product[];
  Catergorysuggestions: any[] = [];
  configdetails!: ConfigData;
  constructor(private customStorageService: CustomStorageService) {
    this.configdetails = this.customStorageService.getItem(
      Constant.localStorage.configTable
    );

    this.Brandsuggestions = this.configdetails.Category.map(
      (element) => element.BrandName
    );

    this.Brandsuggestions = Array.from(new Set(this.Brandsuggestions));

    this.ProductDetails = this.customStorageService.getItem(
      Constant.localStorage.Product
    ) as Product[];
    this.result = this.ProductDetails;
    //console.log(this.result);
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
  getcategory(BrandName: string): any[] {
    return this.configdetails.Category.filter(
      (element) => element.BrandName == BrandName
    );
  }
  filterdata(brandName: string, Categoryname: string) {
    if (brandName != '' && Categoryname != '') {
   
      
      this.result = this.ProductDetails.filter(
        (i) => i.ProductBrand == brandName && i.ProductCatergory == Categoryname
      );

      //console.log(this.result);
    }
  }
}
