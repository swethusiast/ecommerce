import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: User;
  constructor(private auth: AuthService) {}
  ngOnInit() {
    this.auth.appUser$.subscribe(user => (this.user = user));
  }
  logout() {
    this.auth.logout();
  }
}
