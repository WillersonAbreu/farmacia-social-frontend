import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //metodo chamado automaticamente depois do construtor

  }


  //metodo exemplo, controle de acesso, nome, variavel, tipo variavel, tipo retorno
  public metodoTeste(valor: string): string[] {
    return [];
  }

}
