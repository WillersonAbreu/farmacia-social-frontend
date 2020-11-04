import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DonationsService } from '../donations.service';

@Component({
  selector: 'app-list-donations',
  templateUrl: './list-donations.component.html',
  styleUrls: ['./list-donations.component.css']
})
export class ListDonationsComponent implements OnInit {

  donations = [];
  constructor(private service: DonationsService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      data => this.donations = data,
      // erro => this.users = erro,
      erro => console.log(erro),
    );
  }

  deleteConfirm(id: number, nome: string) {
    Swal.fire({
      title: 'Você tem certeza que quer deletar a doação de ' + nome + '?',
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
          'Deletada com sucesso!',
          'A doação ' + nome + ' foi deletada com exito!',
          'success'
        );
        this.getAll();
      },
      erro => {
        Swal.fire({
          icon: 'error',
          title: 'Aconteceu um erro ao deletar a doação',
          text: erro + '',
        });
      }
    );
  }

}
