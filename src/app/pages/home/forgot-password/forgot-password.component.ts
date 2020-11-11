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
export class ForgotPasswordComponent {
  form: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      'email': ['', Validators.required]
    });
  }

  submit() {
    const credenciais = this.form.value;
    this.authService.login(credenciais)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        erro => {
          console.log(erro);
          Swal.fire({
            icon: 'error',
            title: 'Aconteceu um erro durante o login!',
            text: erro.error.message == "Access Denied" ? "Senha está incorreta!" : erro.error.message
          });
        }
      );
  }



}
