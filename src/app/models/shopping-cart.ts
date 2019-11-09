import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for (const productId in itemsMap) {
      if (itemsMap[productId]) {
        const item = itemsMap[productId];
        this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
      }
    }
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (const productId in this.items) {
      if (this.items[productId]) {
        sum += this.items[productId].totalPrice;
      }
    }
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (const productId in this.itemsMap) {
      if (this.itemsMap[productId]) {
        count += this.itemsMap[productId].quantity;
      }
    }
    return count;
  }
}
