import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  productsService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  form = new FormGroup({
    title: new FormControl<string>(this.product.name, {
      nonNullable: true,
      validators: Validators.required,
    }),
    price: new FormControl<number>(this.product.price, {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.productsService
      .put(this.product.id, {
        name: this.form.controls.title.value,
        price: this.form.controls.price.value,
      })
      .subscribe(() => {
        this.matSnackBar.open('Produto editado com sucesso!', 'Fechar');
        this.router.navigate(['/']);
      });
  }
}
