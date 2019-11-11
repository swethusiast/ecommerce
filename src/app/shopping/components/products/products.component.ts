import { Product } from '../../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { map } from 'rxjs/operators';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { TriggerService } from 'src/app/shared/services/trigger.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  color: string;
  size: number;
  price: number;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private trigger: TriggerService,
    private modalService: NgbModal,
  ) {}

  async ngOnInit() {
    this.trigger.triggerLoading();
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }
  private populateProducts() {
    this.productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          return action.map(change => {
            const data = change.payload.val();
            const id = change.key;
            return { id, ...data };
          });
        }),
      )
      .subscribe((products: Product[]) => {
        this.products = products;
        this.getCategory();
      });
  }
  private getCategory() {
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.color = params.get('color');
      this.size = +params.get('size');
      this.price = +params.get('price');
      this.applyFilter(this.category, this.color, this.size, this.price);
    });
  }
  private applyFilter(category, color, size, price) {
    if (category !== null) {
      this.filteredProducts = category
        ? this.products.filter(p => p.category === category)
        : this.products;
    } else if (color !== null) {
      this.filteredProducts = color
        ? this.products.filter(p => p.color === color)
        : this.products;
    } else if (size !== 0) {
      this.filteredProducts = size
        ? this.products.filter(p => {
            return p.size.toString() === size.toString();
          })
        : this.products;
    } else if (price !== 0) {
      this.filteredProducts = price
        ? this.products.filter(p => {
            return p.price.toString() >= price.toString();
          })
        : this.products;
    } else {
      this.filteredProducts = this.products;
    }
    this.modalService.dismissAll();
  }
}
