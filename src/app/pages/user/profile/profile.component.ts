import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
//import { ViaCepService } from 'src/app/core/services/via-cep.service';
import { UserService } from '../../user/user.service';
import { Endereco, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  id: number;
  

  constructor(
    private viacep: NgxViacepService,
    private authService: AuthService,
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
      address: ['', Validators.required],
      number: ['']
    });
    this.authService.getUserData().subscribe(
      userData => {
        this.form.patchValue(userData)
      }
    );
    
  }

  getAddressData(target): void {
    console.log(target.value);
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
            //delete user.password;
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
      Swal.fire({
        icon: 'warning',
        title: 'É necessário estar logado para realizar alteração.',
        //text: 'Preencha o campo "Endereço automaticamente através do CEP ou manualmente'
      });
      
      
    }
  }

}
