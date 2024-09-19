import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar produto</h2>
    <mat-dialog-content>
      Tem certeza que quer deletar esse produto?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNo()">Não</button>
      <button mat-button color="accent" (click)="onYes()" cdkFocusInitial>
        Sim
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}

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

  matDialog = inject(MatDialog);

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product) {
    this.router.navigateByUrl(`/edit-product/${product.id}`);
  }

  onDelete(product: Product) {
    this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((answer: boolean) => {
        if (answer) {
          this.productService.delete(product.id)
          .subscribe(() => {
            //recarregando a pagina
            this.productService.getProducts()
            .subscribe(products => {
              this.products = products;
            });
          });
        }
      });
  }
}
