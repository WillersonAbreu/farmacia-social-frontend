import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
  }
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  submit() {
    this.loading();
    const credentials = this.form.value;
    this.authService.esqueciSenha(credentials.email)
      .subscribe(
        data => {
          this.success();
          this.form.reset();
        },
        err => {
          Swal.close();
          console.log(err.error.message);
        }
      );

  }


  success() {
    Swal.close();
    Swal.fire({
      title: 'Sucesso',
      text: 'Seu pedido foi envido.',
      icon: 'success'
    });
  }

  loading() {
    Swal.fire({
      title: 'Aguarde!',
      text: 'Estamos enviando o email de recuperação de senha.',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

  }



}
