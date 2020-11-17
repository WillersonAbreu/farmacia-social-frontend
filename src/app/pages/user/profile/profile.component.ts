import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
//import { ViaCepService } from 'src/app/core/services/via-cep.service';
import { UserService } from '../../user/user.service';
import { Endereco, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import Swal from 'sweetalert2';
import { formatCep,customYupCepValidator, customYupCpfValidator, customYupPhoneValidator, formatCpf, formatPhone, updateUserSchemaValidator } from 'src/app/core/utils/formUserHelpers';
import { Store } from '@ngrx/store';
import { IUserType } from 'src/app/core/store/user/user.actions';
import * as Yup from 'yup';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Call the custom methods to validate inputs
customYupCepValidator();
customYupCpfValidator();
customYupPhoneValidator();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showPassword: boolean = false;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  form: FormGroup;
  id: number;
  userSchema = updateUserSchemaValidator();

  //Input masks
  phoneMask: string = '(00) 00000-0000';
  cepMask: string = '00000-000';
  cpfMask: string = '000.000.000-00';

  constructor(
    private viacep: NgxViacepService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private store: Store<{ user: IUserType }>

  ) {
    const reduxUser = this.store.select('user');
    reduxUser.subscribe(
      res => this.id = res.id,
      err => console.log(err)
    )
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      password: [''],
      cpf: [''],
      cep: [''],
      address: [''],
      number: ['']
    });
    this.authService.getUserData().subscribe(
      userData => {
        this.form.patchValue(userData)
      }
    );

  }

  handlePasswordInput(): boolean {
    this.showPassword = !this.showPassword;
    return this.showPassword;
  }

  getAddressData(target): void {
    console.log(target.value);
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
    if (this.id) {
      this.service.getOne(this.id)
        .subscribe(
          user => {
            this.form.patchValue(user);
          }
        );
    }
  }

  submit() {
    const user = this.form.value;

    let cleanCpf = user.cpf.split('.').join('');
    cleanCpf = cleanCpf.split('-').join('');

    let cleanPhone = user.phone.split('(').join('');
    cleanPhone = cleanPhone.split(')').join('');
    cleanPhone = cleanPhone.split('-').join('');
    cleanPhone = cleanPhone.split(' ').join('');

    let cleanCep = user.cep.split('-').join('');

    user.cpf = cleanCpf;
    user.phone = cleanPhone;
    user.cep = cleanCep;


    if (this.id) {
      // atualizar
      this.userSchema.validate(user, { abortEarly: false }).then(_success => {
        // Format some input before save on database
        user.cep = formatCep(user.cep);
        user.cpf = formatCpf(user.cpf);
        user.phone = formatPhone(user.phone);

        this.service.update(this.id, user).subscribe(
          data => {
            Swal.fire({
              title: data.message,
              confirmButtonText: `OK`,
            });
            this.router.navigate(['usuarios/meu-perfil']);
          },
          erro => console.log(erro)
        );
      })
      .catch(err => {
        console.log(user);
        console.log(err);

        Swal.hideLoading();
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            this.form.controls[error.path].setErrors(error.message);
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'É necessário estar logado para realizar alteração.',
        //text: 'Preencha o campo "Endereço automaticamente através do CEP ou manualmente'
      });
    }
  }

}
