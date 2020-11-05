import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

// FontAwsome Icons
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Validators
import * as Yup from 'yup';
import { cpf } from 'cpf-cnpj-validator';

Yup.addMethod(Yup.mixed, 'CPF', function(_errorAttributes) {
    return this.test('validateCPF', 'CPF inválido', function(value) {
    const { path, createError } = this;
    if (value === undefined || value === null) {
      return;
    }
    let cleanCpf = value.split('.').join('');
    cleanCpf = cleanCpf.split('-').join('');
    if (!cpf.isValid(cleanCpf)) {
      return createError({ path, message: 'CPF inválido' });
    }
    return cpf.isValid(cleanCpf);
  });
});

Yup.addMethod(Yup.mixed, 'phone', function(_errorAttributes) {
  return this.test('validatePhone', 'Celular inválido', function(value) {
    const { path, createError } = this;
    if (value === undefined || value === null) {
      return;
    }

    if (!validatePhone(value)) {
      return createError({ path, message: 'Celular inválido' });
    }
    return validatePhone(value);
  });
});



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  showPassword: boolean = false;
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
      name: [''],
      email: [''],
      phone: [''],
      password: [''],
      cpf: [''],
      cep: [''],
      street: [''],
      neighborhood: [''],
      number: [''],
      city: [''],
      state: [''],
      address: [''],
    });
    this.getUser();
  }

  handlePasswordInput(): boolean {
    this.showPassword = !this.showPassword;
    return this.showPassword;
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

    const userSchema = Yup.object().shape({
      name: Yup.string().required('O campo nome é necessário para realizar o registro'),
      email:  Yup.string().email('É necessário um email válido').required('O campo email é necessário para realizar o registro'),
      phone:  Yup.string().phone().required('O campo celular é necessário para realizar o registro'),
      password:  Yup.string().required('O campo senha é necessário para realizar o registro'),
      cpf:  Yup.string().CPF('CPF inválido').required('O campo é CPF necessário para realizar o registro'),
      cep:  Yup.string().required('O campo é CEP necessário para realizar o registro'),
      number:  Yup.string().required('O campo é número necessário para realizar o registro'),
      address:  Yup.string().required('O campo é endereço necessário para realizar o registro'),
      // neighborhood:  Yup.string().required('O campo bairro é necessário para realizar o registro'),
      // city:  Yup.string().required('O campo é cidade necessário para realizar o registro'),
      // state:  Yup.string().required('O campo é estado necessário para realizar o registro'),
    });

      userSchema.validate(user, {abortEarly: false}).then(success => {
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
      })
      .catch(err => {
        if(err instanceof Yup.ValidationError){
          err.inner.forEach(error => {
            this.form.controls[error.path].setErrors(error.message);
          });
        }
      });

  }

}

function validatePhone(value: string): boolean {
  const regex = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;

  if(!regex.test(value)){
    return false
  }
  return true;
}
