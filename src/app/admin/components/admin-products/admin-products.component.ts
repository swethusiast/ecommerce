import { Product } from '../../../shared/models/product';
import { Component, QueryList, OnInit, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import {
  NgbdSortableHeaderDirective,
  SortEvent,
} from '../../../shared/services/sortable.directive';
import { Observable } from 'rxjs';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
  providers: [TableService, DecimalPipe],
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<
    NgbdSortableHeaderDirective
  >;

  constructor(private service: TableService) {
    this.products$ = service.products$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  ngOnInit() {}
}
