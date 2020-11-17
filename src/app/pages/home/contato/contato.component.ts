import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css',]
})
export class ContatoComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required],


    });

  }
  submit() {
    Swal.showLoading();
    const contato = this.form.value;

    console.log(contato);




    this.service.contato(contato).subscribe(
      data => {
        Swal.fire({
          title: 'Contato enviado com sucesso',
          text: 'Assim que possivel entraremos em contato.',
          confirmButtonText: `OK`,
        }).then((result) => {
          this.router.navigateByUrl('/contato');
          // this.router.navigate(['users'])
        });
      },
      erro => {
        console.log(erro);
        Swal.fire({
          icon: 'error',
          //title: erro.error.message,
        });
      }
    );

  }



}
