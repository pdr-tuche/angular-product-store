import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { CreateComponent } from './features/create/create.component';
import { inject } from '@angular/core';
import { ProductsService } from './shared/services/products.service';
import { Observable } from 'rxjs';
import { Product } from './shared/interfaces/product.interface';

export const routes: Routes = [
  {
    path: '',
    resolve: {
      products: () => {
        const productsService = inject(ProductsService);
        return productsService.getProducts();
      }
    },
    component: ListComponent,
  },
  {
    path: 'create-product',
    loadComponent: () => import('./features/create/create.component').then(m => m.CreateComponent),
  },
  {
    path: 'edit-product/:id',
    resolve: {
      product: (route: ActivatedRouteSnapshot): Observable<Product> => {
        const productsService = inject(ProductsService);
        return productsService.getById(route.params['id']);
      }
    },
    loadComponent: () =>
      import('./features/edit/edit.component').then(
        (module) => module.EditComponent
      ),
  },
];
