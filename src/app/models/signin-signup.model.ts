export interface SignIn {
    UserName: string;
    Password: string;
    Role: string;
    LastLoginTIme:string;
  }
  
  export interface SignUp {
      UserName: string;
      Password: string;
      ReEnterPassword: string;
      EmailId: string;
      WhatsAppNo:string;
      AlterNateNo:string;
      FromAddressFormate:string;
      Role:string;
      Date:string;
      isApproved:string;
  }
    
  export interface Product {
    ProductName:string,
    ProductPrice: string,
    ProductCatergory: string,
    ProductManufacture:string,
    ProductShipping: string,
    ProductDetails: string,
    ProductOtherDetails:string,
    ProductImages:  string, 
    ProductUploadDate:  string, 

    ProductBrand: string,
    ProductBrandPhonenumber: string,
    ProductStock: string,
    ProductOrderCount: string,

    ProductIsOffer: string,
    ProductOfferPrice: string,
    ProductOfferDiscount: string,
    
    ProductHeading:string,
    ProductOrderType:string,
    
}

export interface Manufacture {
  ManufactureName:string,
  ManufacturetNumber: string,
}

export interface Category {
  BrandName:string,
  CategoryName: string,
  CategoryPhoneNUmber: string,
}

export interface ConfigData{
  Category:Category[],
  Manufacture:Manufacture[],
  Heading:Headings[]
}

export interface BusinessData{
  ConfigtTable:ConfigData,
  ProductTable:Product[]

}
export interface Headings{
  Heading:string,
  SubHeading:string
}

 
  