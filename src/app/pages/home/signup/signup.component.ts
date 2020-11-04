import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

// FontAwsome Icons
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  form: FormGroup;
  id: number;
  ocultaSenha: boolean;
  address: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      cpf: ['', Validators.required],
      cep: ['', Validators.required],
      street: ['', Validators.required],
      neighborhood: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.getUser();
  }

  getUser(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.getOne(this.id)
        .subscribe(
          user => {
            delete user.password;
            this.form.patchValue(user);
          }
        );
    }
  }

  submit() {
    const user = this.form.value;
    console.log(user);

    if (this.id) {
      // atualizar
      this.service.update(this.id, user).subscribe(
        data => this.router.navigate(['users']),
        erro => console.log(erro)
      );
    } else {
      // cadastrar
      this.service.store(user).subscribe(
        data => this.router.navigate(['users']),
        erro => console.log(erro)
      );
    }
  }

}
