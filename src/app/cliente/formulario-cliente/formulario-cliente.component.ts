import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css']
})
export class FormularioClienteComponent implements OnInit {
  form: FormGroup;
  id: number;
  imageBase64;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ClienteService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required]
    });
    this.getCliente();
  }

  getCliente(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.getOne(this.id)
        .subscribe(
          cliente => this.form.patchValue(cliente)
        );
    }
  }

  //ser ativado quando o formulário for enviado
  submit() {
    const cliente = this.form.value;
    cliente.image = this.imageBase64;

    if (this.id) {
      //atualizar
      this.service.update(this.id, cliente).subscribe(
        data => this.router.navigate(["clientes"]),
        erro => console.log(erro)
      );
    } else {
      //cadastrar
      this.service.store(cliente).subscribe(
        data => this.router.navigate(["clientes"]),
        erro => console.log(erro)
      );

    }
    
    }
    handleFileInput(files: FileList) {
      let file = files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () =>  {
        console.log(reader.result);
        this.imageBase64 = reader.result;
        console.log(this.imageBase64);
      };
  
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
  }

}
