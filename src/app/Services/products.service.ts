import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = environment.endpoints.PRODUCTS;
  constructor(private httpClient: HttpClient) { }

  public getProducts(): Observable<any> {
    const req = this.url + '?include=images';
    return this.httpClient.get(req, { observe: 'response' });
  }


  /**
    *
    * @param productId
    */
  getProduct(productId: number): Observable<any> {
    const req = this.url + `/${productId}?include=images`;
    console.log(req);
    return this.httpClient.get<any>(req);
  }


}
