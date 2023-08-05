import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  //sessionStorage.setItem('id', noOfClicks);   // localStorage.setItem('id', noOfClicks);

//sessionStorage.setItem('userDetails', JSON.stringify(userDetails));   // if it's object
//sessionStorage.getItem('id');    // localStorage.getItem('id');

//User user = JSON.parse(sessionStorage.getItem("userDetails")) as User;  // if it's object

  setData(name:string,value:any)
  {
      //localStorage.setItem(name,value);
      sessionStorage.setItem(name, value);
  } 
  getData(name:string):any
  {
      //return localStorage.getItem(name);
      return sessionStorage.getItem(name);
  } 
  removeData(name:string)
  {
     //localStorage.removeItem(name);
     sessionStorage.removeItem(name);  
  } 
  allClear()
  {
     //localStorage.clear();
     sessionStorage.clear();  
  } 
  setObject(name:string,value:any)
  {
      //localStorage.setItem(name, JSON.stringify(value));
      try{
          sessionStorage.setItem(name, JSON.stringify(value));
      }
      catch (error){
      window.alert(error+"error")
      }
      

  }
  getObject(name:string):any
  {
      
      try{
          const data = sessionStorage.getItem(name);
      if(data != null)
      {

          return JSON.parse(data);
      }
      else
      {
          return null;
      }

      }
      catch (error){
      window.alert(error+"error")
      }
  }
}
