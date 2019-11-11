import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db
      .list('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map((x: any) => new ShoppingCart(x[0])));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.id);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        let quantity;
        if (item === null) {
          quantity = 0 + change;
        } else {
          quantity = item.quantity + change;
        }
        console.log(quantity);
        if (quantity === 0) {
          item$.remove();
        } else {
          item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            id: product.id,
            description: product.description,
            color: product.color,
            size: product.size,
            category: product.category,
            quantity,
          });
        }
      });
  }
}
