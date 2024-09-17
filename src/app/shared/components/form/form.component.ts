import { Component, EventEmitter, input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductPayload } from '../../interfaces/payload-product.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  product = input<Product | null>(null);

  form!: FormGroup;

  @Output() done = new EventEmitter<Product>();

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(this.product()?.name ?? '', {
        nonNullable: true,
        validators: Validators.required,
      }),
      price: new FormControl<number>(this.product()?.price ?? 0, {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const product = {
      name: this.form.value.title,
      price: this.form.value.price,
    } as Product;
    this.done.emit(product);
  }
}
