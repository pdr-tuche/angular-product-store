import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { NoItemsComponent } from './components/no-items/no-items.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, NoItemsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  products = signal(inject(ActivatedRoute).snapshot.data['products']);

  productService = inject(ProductsService);

  router = inject(Router);

  confirmationService = inject(ConfirmationDialogService);

  onEdit(product: Product) {
    this.router.navigateByUrl(`/edit-product/${product.id}`);
  }

  onDelete(product: Product) {
    this.confirmationService.openDialog().subscribe((answer: boolean) => {
      if (answer) {
        this.productService.delete(product.id).subscribe(() => {
          //recarregando a pagina
          this.productService.getProducts().subscribe((products) => {
            this.products.set(products);
          });
        });
      }
    });
  }
}
