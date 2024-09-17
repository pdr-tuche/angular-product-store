import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);

  getProducts() {
    return this.httpClient.get<Product[]>('/api/products');
  }

  getById(id: string) {
    return this.httpClient.get<Product>(`/api/products/${id}`);
  }

  post(payload: ProductPayload) {
    return this.httpClient.post('/api/products', payload);
  }

  put(id: number, payload: ProductPayload) {
    return this.httpClient.put(`/api/products/${id}`, payload);
  }
}
