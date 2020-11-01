import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


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
    this.service.getAll().subscribe(
      data => this.users = data,
      // erro => this.users = erro,
      erro => console.log(erro),
    );
  }

}
