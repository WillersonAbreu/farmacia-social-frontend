import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { DetalhaClienteComponent } from './detalha-cliente/detalha-cliente.component';
import { FormularioClienteComponent } from './formulario-cliente/formulario-cliente.component';
import { ClienteService } from './cliente.service';
import { ClienteRoutes } from './cliente.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ClienteComponent,
    ListaClienteComponent,
    DetalhaClienteComponent,
    FormularioClienteComponent
  ],
  providers: [
    ClienteService
  ]
})
export class ClienteModule { }
