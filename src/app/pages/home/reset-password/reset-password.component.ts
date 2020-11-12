import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
    });
  }

  verifyNewPassword() {
    if (this.form.controls.password.value.length && this.form.controls.confirmPassword.value.length) {
      if (this.form.controls.password.value !== this.form.controls.confirmPassword.value) {
        return false;
      } else {
        return true;
      }
    }
  }

  submit() {
    this.loading();
    const credentials = {
      password: this.form.controls.password.value,
      token: this.token
    };
    const validacao = this.verifyNewPassword;
    if (!validacao) {
      this.error;
    }
    if (validacao) {
      this.authService.resetaSenha(credentials)
        .subscribe(
          data => {
            this.success();
            this.form.reset();
          },
          err => {
            this.error(err);
            console.log(err.error.message);
          }
        );
    }

  }

  success() {
    let timerInterval;
    Swal.fire({
      title: 'Senha alterada com sucesso!',
      html: 'Você será redirecionado para tela de login em <b></b> milisegundos.',
      timer: 2000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector('b');
            if (b) {
              const val = Swal.getTimerLeft();
              b.textContent = val.toString();
            }
          }
        }, 100);
      },
      onClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  error({ erro }) {
    Swal.close();
    Swal.fire({
      title: 'Não foi possivel alterar a senha',
      text: 'Verifique as senhas digitadas, e tente novamente',
      icon: 'error'
    });
  }

  loading() {
    Swal.fire({
      title: 'Aguarde!',
      text: 'Sua senha está sendo alterada.',
      willOpen: () => {
        Swal.showLoading();
      }
    });

  }

}
