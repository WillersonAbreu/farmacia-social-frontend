import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-formulario-categoria',
  templateUrl: './formulario-categoria.component.html',
  styleUrls: ['./formulario-categoria.component.css']
})
export class FormularioCategoriaComponent implements OnInit {
  form: FormGroup;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: CategoriaService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required]
    });
    this.getCategoria();
  }

  getCategoria(): void {
    this.id = + this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.service.getOne(this.id)
        .subscribe(
          categoria => this.form.patchValue(categoria)
        );
    }
  }
  //ser ativado quando o formulário for enviado
  submit() {
    const categoria = this.form.value;
    console.log(categoria);

    if (this.id) {
      //atualizar
      this.service.update(this.id, categoria).subscribe(
        data => this.router.navigate(["categorias"]),
        erro => console.log(erro)
      );
    } else {
      //cadastrar
      this.service.store(categoria).subscribe(
        data => this.router.navigate(["categorias"]),
        erro => console.log(erro)
      );
    }
  }

}
