import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'src/Config/Constant';
import { Product } from 'src/app/models/signin-signup.model';
import { CustomStorageService } from 'src/app/services/custom-storage.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  ProductData!: Product;
  isLoading: boolean = true;
  productName!: string;
  photos: any[] = [];
  Productimages!: any;
  RelatedProduct: any[] = [];
  stock!: string;
  shareData: any;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private customStorageService: CustomStorageService
  ) {}

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.productName = this._Activatedroute.snapshot.params["ProductId"];
      this.loadDataBasedOnId();
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  async share() {
    await navigator.share(this.shareData);
  }

  loadDataBasedOnId() {
    this.ProductData = (this.customStorageService.getItem(Constant.localStorage.Product) as Product[]).find(
      (item) => item.ProductName === this.productName
    ) as Product;

    this.photos = [];
    this.Productimages = [];
    this.ProductData.ProductImages.split(',').forEach((item, index) => {
      this.photos.push({
        url: item,
        index: index
      });
    });
    this.Productimages = this.photos[0];

    console.log(this.Productimages.url);

    this.RelatedProduct = (this.customStorageService.getItem(Constant.localStorage.Product) as Product[]).filter(
      (item) => item.ProductCatergory == this.ProductData.ProductCatergory && item.ProductName !=
      this.ProductData.ProductName
    ).slice(0, 6) as Product[];

    this.stock = parseInt(this.ProductData.ProductStock) > 0 ? 'In Stock' : 'Out of Stock';

    this.shareData = {
      title: "Online Shopping Cart",
      text: this.productName.split('-')[0],
      url: `https://myfood-app-11272.web.app/product-View/${this.ProductData.ProductName.replaceAll(' ', '%20')}`,
    };
  }

  activeIndex = 0;

  nextSlide(index: number) {
    if (index >= 0 && index < this.photos.length - 1) {
      console.log("index");
      this.Productimages = this.photos[index + 1];
    }
  }

  prevSlide(index: number) {
    if (index > 0 && index <= this.photos.length) {
      this.Productimages = this.photos[index - 1];
    }
  }
}
