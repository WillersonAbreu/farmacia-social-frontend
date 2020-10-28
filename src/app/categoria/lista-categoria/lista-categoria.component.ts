import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  categorias = [];
  constructor(private service: CategoriaService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      data => this.categorias = data,
      err => console.log(err)
    );
  }

  deleteConfirm(id: number, nome: string) {
    Swal.fire({
      title: 'Tem certeza que quer deletar a categoria ' + nome + '?',
      text: "Não será possivel reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: "Paga não mundaao =O"
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id, nome);
      }
    })
  }

  delete(id: number, nome) {
    this.service.delete(id).subscribe(
      data => {
        Swal.fire(
          'Deletado!',
          'A categoria ' + nome + ' foi deletada com sucesso.',
          'success'
        ),
          this.getAll();
      },
      erro => {
        Swal.fire({
          icon: "error",
          title: "Aconteceu um erro ao deletar a categoria",
          text: erro + ""
        });
      }
    );
  }



}
