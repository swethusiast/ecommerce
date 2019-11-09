import { ShoppingCartService } from './../shopping-cart.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: User;
  cart$: Observable<ShoppingCart>;
  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService,
  ) {}
  async ngOnInit() {
    this.auth.appUser$.subscribe(user => (this.user = user));
    this.cart$ = await this.cartService.getCart();
  }
  logout() {
    this.auth.logout();
  }
}
