import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './detalha-cliente.component.html',
  styleUrls: ['./detalha-cliente.component.css']
})
export class DetalhaClienteComponent implements OnInit {

  cliente: {};

  constructor(
    private service: ClienteService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.service.getOne(id).subscribe(
        data => this.cliente = data,
        err => console.log(err)
      );
    });
    // this.route.snapshot.params.id
  }

}
