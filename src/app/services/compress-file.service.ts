import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { imageCompress } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class CompressFileService {

  constructor(private imageCompress: NgxImageCompressService) { }
  result !: imageCompress;
  async compressImage(files: any, h: number, w: number): Promise<any> {
    let compressedDataUrl: any;
    let compressedblob: any;
    const compressPromises: Promise<void>[] = [];
    const file = files;
    const reader = new FileReader();
    return new
      Promise((resolve) => {
        setTimeout(() => {
          reader.onload = async () => {
            const imageDataUrl = reader.result as string;
            compressedDataUrl = await this.imageCompress.compressFile(imageDataUrl, -1, h, w);
            compressedblob = await fetch(compressedDataUrl).then(r => r.blob())
            //console.log("Compressed:", files);
            this.result = {
              compressedData: compressedDataUrl,
              compressedBlob: compressedblob
            }
            resolve(this.result);
          };

          reader.readAsDataURL(file);
        }, 10);
      });

  }
}
