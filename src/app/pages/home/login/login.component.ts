import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.form = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
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
            text: erro.error.message
          });
        }
      );
  }


}
