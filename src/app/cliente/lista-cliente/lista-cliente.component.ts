import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {
  clientes = [];

  constructor(private service: ClienteService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      data => this.clientes = data,
      err => console.log(err)
    );
  }

  deleteConfirm(id: number, nome: string) {
    Swal.fire({
      title: 'Tem certeza que quer deletar o cliente ' + nome + '?',
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
          'O cliente ' + nome + ' foi deletado com sucesso.',
          'success'
        ),
          this.getAll();
      },
      erro => {
        Swal.fire({
          icon: "error",
          title: "Aconteceu um erro ao deletar o cliente",
          text: erro + ""
        });
      }
    );
  }


}
