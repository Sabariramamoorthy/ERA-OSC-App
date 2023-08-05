import { Component } from '@angular/core';
import { DataGet } from 'src/app/models/file-upload.model';
import { Constant } from 'src/Config/Constant';
import { Product } from 'src/app/models/signin-signup.model';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent {
  ProductDetails !: Product[];
  constructor(
    private _db:FirebaseDataService
    )
  {
    let dataUser : DataGet =
    {
      basePath: Constant.database.baseName,
      tableName: Constant.database.productData,
      itemName: ""
    }
    //var result=this._db.getProperty(dataGet);
    this._db.getAll(dataUser).then(
      (value) => {
        const mapped = Object.keys(value).map(key => (value[key]));
        this.ProductDetails = (mapped as Product[]).sort((a, b) => {
          return <any>new Date(b.ProductUploadDate) - <any>new Date(a.ProductUploadDate)
        });
        console.log(this.ProductDetails);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
}
