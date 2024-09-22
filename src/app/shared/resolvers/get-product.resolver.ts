import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ProductsService } from '../services/products.service';
import { inject } from '@angular/core';

export const getProduct = (
  route: ActivatedRouteSnapshot
): Observable<Product> => {
  const productsService = inject(ProductsService);
  console.log(route.params['id']);
  return productsService.getById(route.params['id']);
};
