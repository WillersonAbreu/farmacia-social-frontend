import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

// FontAwsome Icons
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
import Swal from 'sweetalert2';
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
    private viacep: NgxViacepService
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      password: [''],
      cpf: [''],
      cep: [''],
      neighborhood: [''],
      number: [''],
      city: [''],
      address: [''],
    });
    // this.getUser();
  }

  handlePasswordInput(): boolean {
    this.showPassword = !this.showPassword;
    return this.showPassword;
  }

  getAddressData(target): void {
    this.viacep.buscarPorCep(target.value).then( ( endereco: Endereco ) => {
      const { logradouro, bairro, localidade, uf } = endereco;
      // Injecting the address string to the input
      this.form.controls.address.setValue(`${logradouro}, ${bairro}, ${localidade} - ${uf}`);
     }).catch( (error: ErroCep) => {
      Swal.fire({icon: 'error',
        title: 'Erro ao encontrar o endereço pelo CEP!',
        text: 'Tente outro CEP ou insira o endereço manualmente no campo "Endereço".'
      });
     });
  }

  setNumberOnAddress(target): void {
    let address = this.form.controls.address.value;

    if(address.length > 0){
      address = address.split(',');
      this.form.controls.address.setValue(`${address[0]}, ${target.value}, ${address[1]}, ${address[2]}`);
    }else{
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
            // delete user.password;
            this.form.patchValue(user);
          }
        );
    }
  }

  submit() {
    let user = this.form.value;

    this.userSchema.validate(user, {abortEarly: false}).then(_success => {
      // Format some input before save on database
      user.cep = formatCep(user.cep);
      user.cpf = formatCpf(user.cpf);
      user.phone = formatPhone(user.phone);

      if (this.id) {
      // atualizar
      this.service.update(this.id, user).subscribe(
        data => {
          Swal.fire({icon: 'success', title: data.message});
          this.router.navigate(['usuarios'])
        },
        erro => {
          Swal.fire({icon: 'error', title: 'Erro ao atualizar o usuário', text: erro.error.message});
        }
      );
      } else {
        // cadastrar
        this.service.store(user).subscribe(
          data => {
            Swal.fire({icon: 'success', title: data.message});
            this.router.navigate(['login']);
          },
          erro => {
            Swal.fire({icon: 'error', title: 'Erro ao cadastrar o usuário!', text: erro.error.message});
          }
        );
      }
    })
    .catch(err => {
      if(err instanceof Yup.ValidationError){
        err.inner.forEach((error) => {
          this.form.controls[error.path].setErrors(error.message);
        });
      }
    });
  }
}


