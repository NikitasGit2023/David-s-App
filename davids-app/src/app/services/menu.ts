import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export interface MenuItem {
  // id: number;
  // category: string;
  name: string;
  
  price: number;
  imageUrl: string;
  description?: string,
  ingredients: string[],
}

@Injectable({ providedIn: 'root' })
export class MenuService {
    constructor(private http: HttpClient) {}

  getMenu(): Observable<any> {
    return this.http.get('assets/menu.json');
  }


}
