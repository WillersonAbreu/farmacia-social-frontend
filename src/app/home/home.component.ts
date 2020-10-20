import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users = [
    {
      "id": 1,
      "name": "Rayssa",
      "email": "rayssa@rayssa.com",
      "phone": "(12) 98175-5795",
      "password": "$2a$10$7FbZ1fcNvhCPz/21PYqtjuTFJ5MyRVvGruPUsPmPiSdDURtMk5cTS",
      "cpf": "418.229.638-93",
      "cep": "12711-230",
      "address": "R. João Bosco Varajão, 43, Lagoa Dourada II, Cruzeiro - SP",
      "createdAt": "2020-10-12T19:52:24.511+00:00",
      "updatedAt": "2020-10-12T19:52:24.511+00:00"
    },
    {
      "id": 2,
      "name": "Willerson",
      "email": "w@w.com",
      "phone": "(12) 98175-5795",
      "password": "$2a$10$8ewESyn9TYB1WasoE7R3LuDlEuB9Nc62EQHO74eQaUkwWrGN.1RuW",
      "cpf": "410.706.838-25",
      "cep": "12711-230",
      "address": "R. João Bosco Varajão, 43, Lagoa Dourada II, Cruzeiro - SP",
      "createdAt": "2020-10-17T00:28:27.398+00:00",
      "updatedAt": "2020-10-17T00:28:27.398+00:00"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
