import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Constant } from 'src/Config/Constant';
import { DataGet } from 'src/app/models/file-upload.model';
import { ConfigData, Product } from 'src/app/models/signin-signup.model';
import { CustomStorageService } from 'src/app/services/custom-storage.service';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css'],
})
export class ProductsViewComponent implements OnInit {
  ProductDetails!: Product[];
  Brandsuggestions: string[] = [];
  Catergorysuggestions: any[] = [];
  configdetails!: ConfigData;
  result: Product[] = [];
  TPage!: number;
  CPage: number = 1;
  perPage: number = 12;
  showMenu: boolean = true;
  selectedOption: string = 'recent'; // Default selection
  isChecked: boolean = false;
  tag!: string;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  isLoading: boolean = true;
  constructor(
    private customStorageService: CustomStorageService,
    private sanitizer: DomSanitizer,
    private _db: FirebaseDataService,
    private _Activatedroute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.configdetails = this.customStorageService.getItem(
        Constant.localStorage.configTable
      );
      this.Brandsuggestions = Array.from(
        new Set(
          this.configdetails.Category.map((element) => element.BrandName)
        )
      );
      this.tag = this._Activatedroute.snapshot.params['tag'];
      this.ProductDetails = this.customStorageService.getItem(
        Constant.localStorage.Product
      ) as Product[];

      this.ProductDetails=this.ProductDetails.filter((i)=> i.ProductHeading == this.tag);
      
    });
    this.result = this.ProductDetails;
    this.TPage = Math.ceil(this.ProductDetails.length / this.perPage);
    this.result = this.result.slice(0, this.perPage);
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
    if (brandName !== '' && Categoryname !== '') {
      this.result = this.ProductDetails.filter(
        (i) =>
          i.ProductBrand === brandName && i.ProductCatergory === Categoryname
      );
    }
  }

  onCheckboxChange(
    event: Event,
    brandName: string,
    Categoryname: string
  ): void {
    // Cast the event target to HTMLInputElement to access the 'checked' property
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.filterdata(brandName, Categoryname);
    } else {
      this.updateResult();
    };
  }

  nextSlide() {
    if (this.CPage < this.TPage) {
      this.CPage = this.CPage + 1;
      this.updateResult();
    }
  }

  prevSlide() {
    if (this.CPage > 1) {
      this.CPage = this.CPage - 1;
      this.updateResult();
    }
  }

  // Function to update the result based on the current page
  updateResult() {
    const startIndex = (this.CPage - 1) * this.perPage;
    const endIndex = startIndex + this.perPage;
    this.result = this.ProductDetails.slice(startIndex, endIndex);
    this.onSortOptionChange();
    console.log(this.result.length);
  }
  // Sort by price low to high
  sortPriceLowToHigh(): void {
    this.result.sort((a, b) => {
      return parseInt(a.ProductPrice) - parseInt(b.ProductPrice);
    });
  }

  // Sort by price high to low
  sortPriceHighToLow(): void {
    this.result.sort((a, b) => {
      return parseInt(b.ProductPrice) -parseInt(a.ProductPrice);
    });
  }

  onSortOptionChange(): void {
    switch (this.selectedOption) {
      case 'recent':
        // Sorting logic for 'recent'
        this.updateResult();
        break;
      case 'low-to-high':
        // Sorting logic for 'low-to-high'
        this.sortPriceLowToHigh();
        break;
      case 'high-to-low':
        // Sorting logic for 'high-to-low'
        this.sortPriceHighToLow();
        break;
      case 'popular':
        // Sorting logic for 'popular'
        // this.sortPopular();
        break;
      case '4-rating':
        // Sorting logic for '4-rating'
        // this.sortByRating(4);
        break;
      default:
        // Handle the default case (e.g., 'recent' sorting)
        // this.sortRecent();
        break;
    }

  }
}
