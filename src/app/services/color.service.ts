import { Injectable } from '@angular/core';
import { Color, ColorConst } from 'src/Config/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
 
  constructor() 
  { 
  }
  getColor(value:string):Color
  {
    let color;
    switch(value){
      case "DarkTheme_Voilet": {
        color= ColorConst.DarkTheme_Voilet 
        break;
      }
      case "LightTheme_Voilet": {
        color= ColorConst.LightTheme_Voilet 
        break;
      }
    }    
    return color as Color
  }
}
