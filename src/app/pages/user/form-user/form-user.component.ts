import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  form: FormGroup;
  id: number;
  imageBase64;

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

  handleFileInput(files: FileList) {
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log(reader.result);
      this.imageBase64 = reader.result;
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

}
