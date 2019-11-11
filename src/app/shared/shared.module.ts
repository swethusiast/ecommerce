import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  exports: [
    CommonModule,
    ProductCardComponent,
    ProductQuantityComponent,
    NgbModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoadingComponent,
  ],
  entryComponents: [LoadingComponent],
})
export class SharedModule {}
