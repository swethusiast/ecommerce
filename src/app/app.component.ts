import { Component, HostListener, Inject } from '@angular/core';
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate(300)]),
      transition(':leave', [animate(500)]),
    ]),
  ],
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) document) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 300) {
      const element = document.getElementById('navbar');
      element.classList.add('fixed-top', 'border');
    } else {
      const element = document.getElementById('navbar');
      element.classList.remove('fixed-top', 'border');
    }
  }
}
