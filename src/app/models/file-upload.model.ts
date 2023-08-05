export interface DataInsert
{
  basePath:string,
  tableName:string,
  itemName:string,
  insertData:any
}

export interface DataGet
{
  basePath:string,
  tableName:string,
  itemName:string
}

export interface imageCompress
{
   compressedData:any;
   compressedBlob:any;
}

export class Fileupload
{
  BasePath:string;
  pageName:string;
  orderFolder:string;
  fileName:string;
  file:any;

  constructor(basePath: string,pagename:string,orderfolder:string,filename:string,File:string) 
  {
    this.BasePath = basePath;
    this.pageName = pagename;
    this.orderFolder=orderfolder;
    this.file=File;
    this.fileName=filename;
  }
}


export interface DataUpdate
{
  basePath:string,
  tableName:string,
  itemName:string,
  insertData:any
}