import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/Config/Constant';
import { ConfigData, Product } from 'src/app/models/signin-signup.model';
import { CustomStorageService } from 'src/app/services/custom-storage.service';

@Component({
  selector: 'app-categoryshopping',
  templateUrl: './categoryshopping.component.html',
  styleUrls: ['./categoryshopping.component.css'],
})
export class CategoryshoppingComponent implements OnInit {
  Brandsuggestions: string[] = [];
  isLoading: boolean = true;
  ProductDetails: Product[] = [];
  result: Product[] = [];
  Catergorysuggestions: any[] = [];
  configdetails!: ConfigData;
  TPage!: number;
  CPage: number = 1;
  perPage: number = 12;
  showMenu: boolean = true;
  selectedOption: string = 'recent'; // Default selection

  isChecked: boolean = false;

  constructor(
    private customStorageService: CustomStorageService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.configdetails = this.customStorageService.getItem(
      Constant.localStorage.configTable
    );
    this.Brandsuggestions = Array.from(
      new Set(
        this.configdetails.Category.map((element) => element.BrandName)
      )
    );

    this.ProductDetails = this.customStorageService.getItem(
      Constant.localStorage.Product
    ) as Product[];

    this._Activatedroute.paramMap.subscribe((params) => {
      const inputName =this._Activatedroute.snapshot.params['tag'];
      if(inputName !=null && inputName !=undefined && inputName !='' && inputName !='all')
      {
        this.ProductDetails = this.ProductDetails.filter(item => item.ProductCatergory.toLowerCase().includes(inputName.toLowerCase()));
      }
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
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
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

  

  // // Sort by rating (assuming Product has a 'rating' property)
  // sortRating(): void {
  //   this.result.sort((a, b) => {
  //     return b.rating - a.rating;
  //   });
  // }

  // // Sort by popularity (assuming Product has a 'popularity' property)
  // sortPopular(): void {
  //   this.result.sort((a, b) => {
  //     return b.popularity - a.popularity;
  //   });
  // }

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
