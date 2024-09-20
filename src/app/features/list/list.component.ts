import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  products: Product[] = [];

  productService = inject(ProductsService);

  router = inject(Router);

  confirmationService = inject(ConfirmationDialogService);

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product) {
    this.router.navigateByUrl(`/edit-product/`);
  }

  onDelete(product: Product) {
    this.confirmationService.openDialog()
      .subscribe((answer: boolean) => {
        if (answer) {
          this.productService.delete(product.id).subscribe(() => {
            //recarregando a pagina
            this.productService.getProducts().subscribe((products) => {
              this.products = products;
            });
          });
        }
      });
  }
}
