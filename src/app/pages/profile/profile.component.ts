import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ViaCepService } from 'src/app/core/services/via-cep.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  id: number;
  imageBase64;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private viaCepService: ViaCepService
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
      city: [''],
      state: ['']
    });
    this.authService.getUserData().subscribe(
      userData => {
        this.form.patchValue(userData)
      }
    );
    this.viaCepService.get("09911000").subscribe(
      userAddress => {
        console.log(userAddress)
        this.form.patchValue({
          city: userAddress.localidade,
          state: userAddress.uf,
          address: userAddress.logradouro
        }
        )
      }
    )
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
    user.image = this.imageBase64;

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
