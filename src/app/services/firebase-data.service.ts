import { Injectable } from '@angular/core';
import { DataGet, DataUpdate } from '../models/file-upload.model';
import { DataInsert } from '../models/file-upload.model';
import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Constant } from 'src/Config/Constant';


@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  constructor(private  db: AngularFireDatabase,
     private _localstorage: LocalstorageService,
     private _router:Router) { }
  
     writeUserData(input: DataInsert): any {
      let result: string = Constant.flag.true;
      //console.log("dataInsert");
      this.db.database.ref(`/${input.basePath}/${input.tableName}/${input.itemName}`)
        .set(input.insertData).catch((error) => {
          console.log(error);
          result = Constant.flag.false;
        }
        )
        .then((value) => {
          result = Constant.flag.true;
          console.log("DataUploaded SuccessFully:",value);
          
        })
      return result;
    }
  
    async getProperty(input: DataGet): Promise<any> {
      let result !:any;
      const dbRef = this.db.database.ref(input.basePath);
      await dbRef.child(input.tableName).child(input.itemName).get().then((snapshot) => {
        if (snapshot.exists()) {
          result=snapshot.val();        
        }
        else
        {
          result=null;
        }
      });
      //console.log(result);
      return result;
      
    }
  
    async dataExisting(input: DataGet): Promise<any> {
      let result !:boolean;
      const dbRef = this.db.database.ref(input.basePath);
      await dbRef.child(input.tableName).child(input.itemName).get().then((snapshot) => {
        if (snapshot.exists()) {
          // result=snapshot.val();       
          result=true;   
        }
        else
        {
          result=false;
        }
      });
      //console.log(result);
      
      return result;  
    }
  
    async getAll(input: DataGet): Promise<any> {
      let result !:any;
      const dbRef = this.db.database.ref(input.basePath);
      await dbRef.child(input.tableName).get().then((snapshot) => {
        if (snapshot.exists()) {
          result=snapshot.val();        
        }
        else
        {
          result=null;
        }
      });
      //console.log(result);
      return result;
      
    }
  
  
    async update(input:DataUpdate):Promise<any> {
     await this.db.database.ref(`/${input.basePath}/${input.tableName}/${input.itemName}`).update(input.insertData)
     .then((value)=>
     {
      console.log("update success:",value);
      return value;   
     });
    }
}
