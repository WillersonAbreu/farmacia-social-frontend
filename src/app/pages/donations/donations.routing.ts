import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth-guard.service';
import { DetailDonationComponent } from './detail-donation/detail-donation.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { DonationsComponent } from './donations.component';
import { ListDonationsComponent } from './list-donations/list-donations.component';
import { PedidosComponent } from './pedidos/pedidos.component';

const routes: Routes = [
  {
    path: 'doacoes',
    component: DonationsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListDonationsComponent },
      { path: 'cadastro', component: DonationFormComponent },
      { path: ':id', component: DetailDonationComponent },
      { path: ':id/editar', component: DonationFormComponent },
      { path: 'pedidos', component: PedidosComponent },
    ]
  },
];

export const DonationsRoutes = RouterModule.forChild(routes);
