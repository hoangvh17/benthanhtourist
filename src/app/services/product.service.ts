import { Injectable, Query } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:8000/v1';

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  getProductDisplay(){
    return this.httpClient.get(`${this.url}/product/display`);
  }

  getAll(){
    const headers = {'Authorization': 'Bearer '+ this.auth.getToken()}
    return this.httpClient.get(`${this.url}/product`, {headers});
    // return this.httpClient.get(`${this.url}/product`)
  }

  get(id:string){
    return this.httpClient.get(`${this.url}/product/${id}`);
  }

  delete(id:string){
    return this.httpClient.delete(`${this.url}/product/${id}`);
  }

  save(product: Product){
    return this.httpClient.post(`${this.url}/product`, product);
  }

  update(id: string, product: Product){
    return this.httpClient.put<any>(`${this.url}/product/${id}`, product);
  }

  // getProductByQuery(params: any){
  //   console.log(params);
  //   let query = '';
  //   if(params.keyword){
  //     query = `keyword=${params.keyword}`;
  //   } else if (params.categoryId) {
  //     query = `categoryId=${params.categoryId}`;
  //   }
  //   console.log(`${this.url}/products?${query}`);
  //   return this.httpClient.get(`${this.url}/products?${query}`);
  // }

  getProductByQuery(params: any) {
    console.log(params);
    let query = new URLSearchParams();

    if (params.keyword) {
      query.append('keyword', params.keyword);
    }

    if (params.categoryId) {
      query.append('categoryId', params.categoryId);
    }

    if (params.sortField) {
      query.append('sortField', params.sortField);
    }

    if (params.sortOrder) {
      query.append('sortOrder', params.sortOrder);
    }

    console.log(`${this.url}/products?${query.toString()}`);
    return this.httpClient.get(`${this.url}/products?${query.toString()}`);
  }


}
