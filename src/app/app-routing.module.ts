import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AboutComponent } from './pages/about/about.component';
import { DonationsComponent } from './pages/donations/donations.component';
import { DonationFormComponent } from './pages/donation-form/donation-form.component';



const routes: Routes = [
  {
    path: '', loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: '', loadChildren: './pages/user/user.module#UserModule'
  },
  { path: 'doações/cadastro', component: DonationFormComponent },
  { path: 'doação', component: DonationsComponent },
  { path: 'sobre', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
