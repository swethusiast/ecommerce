import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor() {}

  addToCart() {
    // this.cartService.addToCart(this.product);
  }

  // removeFromCart() {
  //   this.cartService.removeFromCart(this.product);
  // }
}
