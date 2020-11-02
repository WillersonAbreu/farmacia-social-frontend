import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users = [];
  //injetar o serviço que comunica com o back pra trazer os clientes
  constructor(private service: UserService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      data => this.users = data,
      // erro => this.users = erro,
      erro => console.log(erro),
    );
  }

  deleteConfirm(id: number, nome: string) {
    Swal.fire({
      title: 'Você tem certeza que quer deletar o usuario ' + nome + '?',
      text: 'Essa alteração é irrevesível!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id, nome);
      }
    });
  }

  delete(id: number, nome) {
    this.service.delete(id).subscribe(
      data => {
        Swal.fire(
          'Deletado com sucesso!',
          'O usuário ' + nome + ' foi deletado com exito!',
          'success'
        );
        this.getAll();
      },
      erro => {
        Swal.fire({
          icon: 'error',
          title: 'Aconteceu um erro ao deletar o usuário',
          text: erro + '',
        });
      }
    );
  }




}
