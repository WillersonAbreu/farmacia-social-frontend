import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-detalha-categoria',
  templateUrl: './detalha-categoria.component.html',
  styleUrls: ['./detalha-categoria.component.css']
})
export class DetalhaCategoriaComponent implements OnInit {

  categoria: {};

  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get("id"));
      this.service.getOne(id).subscribe(
        data => this.categoria = data,
        err => console.log(err)
      );
    });

  }

}
