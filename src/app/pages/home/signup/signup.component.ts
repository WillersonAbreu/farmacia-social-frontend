import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../../core/services/auth.service';

// FontAwsome Icons
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Validators
import * as Yup from 'yup';
import {
  customYupCepValidator,
  customYupCpfValidator,
  customYupPhoneValidator,
  formatCep,
  formatCpf,
  formatPhone,
  userSchemaValidator
} from 'src/app/core/utils/formUserHelpers';
import { Endereco, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';

// Call the custom methods to validate inputs
customYupCepValidator();
customYupCpfValidator();
customYupPhoneValidator();

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
  userSchema = userSchemaValidator();

  //Input masks
  phoneMask: string = '(00) 00000-0000';
  cepMask: string = '00000-000';
  cpfMask: string = '000.000.000-00';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private viacep: NgxViacepService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      password: [''],
      cpf: [''],
      cep: [''],
      number: [''],
      city: [''],
      address: [''],
    });
    this.getUser();
  }


  handlePasswordInput(): boolean {
    this.showPassword = !this.showPassword;
    return this.showPassword;
  }

  getAddressData(target): void {
    this.viacep.buscarPorCep(target.value).then((endereco: Endereco) => {
      const { logradouro, bairro, localidade, uf } = endereco;
      // Injecting the address string to the input
      this.form.controls.address.setValue(`${logradouro}, ${bairro}, ${localidade} - ${uf}`);
    }).catch((error: ErroCep) => {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao encontrar o endereço pelo CEP!',
        text: 'Tente outro CEP ou insira o endereço manualmente no campo "Endereço".'
      });
    });
  }

  setNumberOnAddress(target): void {
    let address = this.form.controls.address.value;

    if (address.length > 0) {
      address = address.split(', ');

      if (address.length == 4) {
        address[1] = target.value;
        this.form.controls.address.setValue(`${address[0]}, ${address[1]}, ${address[2]}, ${address[3]}`);
      } else {
        this.form.controls.address.setValue(`${address[0]}, ${target.value}, ${address[1]}, ${address[2]}`);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'É necessário preencher o campo "Endereço" antes',
        text: 'Preencha o campo "Endereço automaticamente através do CEP ou manualmente'
      });
    }
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

    this.userSchema.validate(user, { abortEarly: false }).then(_success => {
      Swal.showLoading();
      // Format some input before save on database
      user.cep = formatCep(user.cep);
      user.cpf = formatCpf(user.cpf);
      user.phone = formatPhone(user.phone);

      //atualizar
      if (this.id) {
        this.service.update(this.id, user).subscribe(
          data => {
            Swal.fire({
              title: 'Dados do usuário atualizados com sucesso!',
              confirmButtonText: `OK`,
            });
          },
          erro => console.log(erro)
        );
      } else {
        // cadastrar
        this.authService.register(user).subscribe(
          data => {
            Swal.fire({
              title: 'O cadastro foi um sucesso!',
              text: 'Verifica sua caixa de email e valide sua conta.',
              confirmButtonText: `OK`,
            });
            this.router.navigateByUrl('/login');
          },
          erro => {
            console.log(erro);
            Swal.fire({
              icon: 'error',
              title: erro.error.message,
              timer: 5000
            });
          }
        );

      }

    })
      .catch(err => {
        Swal.hideLoading();
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            this.form.controls[error.path].setErrors(error.message);
          });
        }
      });
  }
}


