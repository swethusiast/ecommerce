import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  // @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor() {}

  addToCart() {
    // this.cartService.addToCart(this.product);
  }
}
