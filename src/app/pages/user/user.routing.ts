import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../home/signup/signup.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    children: [
      { path: '', component: ListUsersComponent }, // usuarios
      { path: 'cadastrar', component: SignupComponent }, // usuarios/cadastrar
      { path: ':id/editar', component: SignupComponent }, // usuarios/:id/editar
      { path: ':id', component: DetailUserComponent }, // usuarios/:id
    ]
  },
];

export const UserRoutes = RouterModule.forChild(routes);
