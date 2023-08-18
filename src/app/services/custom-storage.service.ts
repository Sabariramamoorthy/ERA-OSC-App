import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomStorageService {


  constructor() { }

  setItem(key: string, value: any): void {
    localStorage[key] = JSON.stringify(value);
  }

  getItem(key: string): any {
    return JSON.parse( localStorage[key]) || null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear;
  }
}
