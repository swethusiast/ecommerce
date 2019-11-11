import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },

  {
    path: 'login',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./shopping/shopping.module').then(m => m.ShoppingModule),
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
