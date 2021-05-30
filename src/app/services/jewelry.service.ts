import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jewelry } from '../jewelry/jewelry.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JewelryService {
  private jewelryUrl = 'https://localhost:44368/jewelry';

  constructor(private http: HttpClient) { }

  calculateTotal(jewelry: Jewelry) : Observable<any> {
    return this.http.post(`${this.jewelryUrl}/calculate`, {
      pricePerGram: jewelry.price,
      weight: jewelry.weight,
      discount: jewelry.discount
    });
  }

  printToFile(jewelry : Jewelry) {
    return this.http.post(`${this.jewelryUrl}/downloadpdf`, {
      pricePerGram: jewelry.price,
      weight: jewelry.weight,
      discount: jewelry.discount
    }, {
      observe: 'response',
      responseType: 'blob'
    });

  }
}
