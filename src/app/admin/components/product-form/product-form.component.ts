import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { TriggerService } from 'src/app/shared/services/trigger.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = {
    id: '',
    title: '',
    description: '',
    color: '',
    size: '',
    price: null,
    category: '',
    imageUrl: '',
  };

  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private trigger: TriggerService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .get(this.id)
        .valueChanges()
        .subscribe((p: Product) => (this.product = p));
    }
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }
  delete() {
    swal
      .fire({
        type: 'warning',
        title: 'Are you sure to Delete this Product?',
        text: 'Deleting this data maybe be harmful for any related objects!',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it!',
        confirmButtonColor: 'rgb(255, 51, 102)',
        cancelButtonColor: 'rgb(204, 204, 204, .8)',
        customClass: {
          confirmButton: 'border-32',
          cancelButton: 'border-32',
        },
      })
      .then(result => {
        if (result.value) {
          this.trigger.triggerLoading();
          this.productService.delete(this.id);
          this.router.navigate(['/admin/products']);
          this.modalService.dismissAll();
        } else if (result.dismiss === swal.DismissReason.cancel) {
          return true;
        }
      });
  }
}
