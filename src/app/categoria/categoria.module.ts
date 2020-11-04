import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaRoutes } from './categoria.routing';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { DetalhaCategoriaComponent } from './detalha-categoria/detalha-categoria.component';
import { FormularioCategoriaComponent } from './formulario-categoria/formulario-categoria.component';
import { CategoriaService } from './categoria.service';

@NgModule({
  imports: [
    CommonModule,
    CategoriaRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CategoriaComponent,
    ListaCategoriaComponent,
    DetalhaCategoriaComponent,
    FormularioCategoriaComponent
  ],
  providers: [
    CategoriaService
  ]
})
export class CategoriaModule { }
