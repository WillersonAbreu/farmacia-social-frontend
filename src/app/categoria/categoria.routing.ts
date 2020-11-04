import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services/auth-guard.service';
import { CategoriaComponent } from './categoria.component';
import { DetalhaCategoriaComponent } from './detalha-categoria/detalha-categoria.component';
import { FormularioCategoriaComponent } from './formulario-categoria/formulario-categoria.component';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';

const routes: Routes = [
  {
    path: 'categorias',
    component: CategoriaComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListaCategoriaComponent }, // categorias
      { path: 'cadastrar', component: FormularioCategoriaComponent }, // categorias/cadastrar
      { path: ':id/editar', component: FormularioCategoriaComponent }, // categorias/:id/editar
      { path: ':id', component: DetalhaCategoriaComponent }, // categorias/:id
    ]
  }
];

export const CategoriaRoutes = RouterModule.forChild(routes);
