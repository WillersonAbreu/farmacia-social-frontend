import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth-guard.service';
import { SignupComponent } from '../home/signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UserComponent,
    children: [
      { path: 'meu-perfil', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'cadastrar', component: SignupComponent }, // usuarios/cadastrar
      { path: ':id/editar', component: SignupComponent, canActivate: [AuthGuard] }, // usuarios/:id
    ]
  },
];

export const UserRoutes = RouterModule.forChild(routes);
