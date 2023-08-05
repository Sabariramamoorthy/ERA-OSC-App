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
}
  

 
  