import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { Product } from './models/product';
import { ProductService } from './product.service';
import { DecimalPipe } from '@angular/common';
import { tap, debounceTime, delay, switchMap } from 'rxjs/operators';
import { SortDirection } from './sortable.directive';

interface SearchResult {
  products: Product[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(
  products: Product[],
  column: string,
  direction: string,
): Product[] {
  if (direction === '') {
    return products;
  } else {
    return [...products].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(product: Product, term: string, pipe: PipeTransform) {
  return (
    product.title.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(product.price).includes(term) ||
    product.category.includes(term.toLowerCase())
  );
}
@Injectable({
  providedIn: 'root',
})
export class TableService {
  productsList = new BehaviorSubject<Product[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _products$ = new BehaviorSubject<Product[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(productService: ProductService, private pipe: DecimalPipe) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false)),
      )
      .subscribe(result => {
        this._products$.next(result.products);
        this._total$.next(result.total);
      });

    this._search$.next();
    productService
      .getAll()
      .valueChanges()
      .subscribe((list: Product[]) => {
        console.log(list);
        this.productsList.next(list);
        console.log(this.productsList);
      });
  }

  get products$() {
    return this._products$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {
      sortColumn,
      sortDirection,
      pageSize,
      page,
      searchTerm,
    } = this._state;
    let listItems;
    this.productsList.subscribe(data => {
      listItems = data;
    });
    // 1. sort
    let products = sort(listItems, sortColumn, sortDirection);
    // 2. filter
    products = products.filter(product =>
      matches(product, searchTerm, this.pipe),
    );
    const total = products.length;

    // 3. paginate
    products = products.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize,
    );
    return of({ products, total });
  }
}
