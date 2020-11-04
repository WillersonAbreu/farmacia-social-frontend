import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { DetalhaClienteComponent } from './detalha-cliente/detalha-cliente.component';
import { FormularioClienteComponent } from './formulario-cliente/formulario-cliente.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';

const routes: Routes = [
  {
    path: 'clientes',
    component: ClienteComponent,
    children: [
      { path: '', component: ListaClienteComponent }, // clientes
      { path: 'cadastrar', component: FormularioClienteComponent }, // clientes/cadastrar
      { path: ':id/editar', component: FormularioClienteComponent }, // clientes/:id/editar
      { path: ':id', component: DetalhaClienteComponent }, // clientes/:id
    ]
  }
];

export const ClienteRoutes = RouterModule.forChild(routes);
