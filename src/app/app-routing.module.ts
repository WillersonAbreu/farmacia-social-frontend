import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: '', loadChildren: './pages/user/user.module#UserModule'
  },
  {
    path: '', loadChildren: './pages/donations/donation.module#DonationsModule'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
