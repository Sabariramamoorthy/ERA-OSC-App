import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Fileupload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFileService {

  
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  async uploadFile(file: Fileupload): Promise<string> {
  
    const filePath = `${file.BasePath}/${file.pageName}/${file.orderFolder}/${file.fileName}`;
    
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file.file);
    return await new Promise((resolve, reject) => {
      task.then(() => {
        fileRef.getDownloadURL().subscribe((downloadUrl: string) => {
          resolve(downloadUrl); // Resolve with the download URL
          console.log(downloadUrl);
        }, (error: any) => {
          reject(error); // Reject with the error
        });
      }, (error: any) => {
        reject(error); // Reject with the error
      });
    });
  }

  private deleteFileDatabase(file: Fileupload): Promise<void> {
    return this.db.list(file.BasePath).remove(file.fileName);
  }

  private deleteFileStorage(file: Fileupload): void {
    const storageRef = this.storage.ref(file.BasePath);
    storageRef.child(file.fileName).delete();
  }

  async downloadURL(file: Fileupload):Promise<string>
  {
    const filePath = `${file.BasePath}/${file.pageName}/${file.orderFolder}/${file.fileName}`;
    console.log(filePath);
    const fileRef = this.storage.ref(filePath);
    return await new Promise((resolve, reject) => {
      fileRef.getDownloadURL().subscribe((downloadURL:string) =>
      {
        console.log(file.fileName,":",downloadURL);
        
        resolve(downloadURL)
      }),
      (error: any) => {
        reject(error); // Reject with the error
      };
    });
    
  }
}
