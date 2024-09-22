import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { getProducts } from './shared/resolvers/get-products.resolver';
import { getProduct } from './shared/resolvers/get-product.resolver';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './shared/interfaces/product.interface';
import { ProductsService } from './shared/services/products.service';

export const routes: Routes = [
  {
    path: '',
    resolve: {
      products: getProducts,
    },
    component: ListComponent,
  },
  {
    path: 'create-product',
    loadComponent: () =>
      import('./features/create/create.component').then(
        (m) => m.CreateComponent
      ),
  },
  {
    path: 'edit-product/:id',
    resolve: {
      product: getProduct,
    },
    loadComponent: () =>
      import('./features/edit/edit.component').then(
        (module) => module.EditComponent
      ),
  },
];
