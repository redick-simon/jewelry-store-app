import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JewelryComponent } from './jewelry/jewelry.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path: 'jewelry/:user', component: JewelryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
