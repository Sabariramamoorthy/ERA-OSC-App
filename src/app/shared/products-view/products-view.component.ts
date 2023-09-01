import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Constant } from 'src/Config/Constant';
import { DataGet } from 'src/app/models/file-upload.model';
import { Product } from 'src/app/models/signin-signup.model';
import { CustomStorageService } from 'src/app/services/custom-storage.service';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css'],
})
export class ProductsViewComponent implements OnInit {
  ProductDetails!: Product[];
  showMenu: boolean = true;
  tag!: string;
  toggleMenu() {
    this.showMenu = !this.showMenu;
    console.log(this.showMenu);
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
      this.tag = this._Activatedroute.snapshot.params['tag'];
      this.ProductDetails = this.customStorageService.getItem(
        Constant.localStorage.Product
      ) as Product[];

      this.ProductDetails=this.ProductDetails.filter((i)=> i.ProductHeading == this.tag);
      
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
