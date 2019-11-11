import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavbarComponent, LoginComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
  ],
  exports: [NavbarComponent],
})
export class CoreModule {}
