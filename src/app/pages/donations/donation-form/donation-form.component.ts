import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// FontAwsome Icons
import { faCloudUploadAlt, faPrescriptionBottle, faPills } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { PharmacyService } from 'src/app/core/services/pharmacyService.service';
import { IUserType } from 'src/app/core/store/user/user.actions';
import Swal from 'sweetalert2';
import { DonationsService } from '../donations.service';


@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit {
  form: FormGroup;
  id: number;
  imageBase64Front;
  imageBase64Back;
  pharmacyList: any[];
  faCloudUploadAlt = faCloudUploadAlt;
  faPrescriptionBottle = faPrescriptionBottle;
  faPills = faPills
  loggedUserId: number;

  constructor(
    private formBuilder: FormBuilder,
    private pharmacyService: PharmacyService,
    private route: ActivatedRoute,
    private router: Router,
    private service: DonationsService,
    private store: Store<{ user: IUserType }>
  ) {
    this.store.select('user').subscribe(user => this.loggedUserId = user.id);
  }

  getPharmacy() {
    this.pharmacyService.getAll()
      .subscribe(
        farmacias => this.pharmacyList = farmacias
      )
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      pictureFile: [''],
      pictureFileBack: [''],
      description: ['', Validators.required],
      stripe: ['', Validators.required],
      packing: ['', Validators.required],
      amount: ['', Validators.required],
      dosage: ['', Validators.required],
      manufacturyDate: ['', Validators.required],
      shelfLife: ['', Validators.required],
      batchCode: ['', Validators.required],
      userId: ['', Validators.required],
      pharmacyId: ['', Validators.required],
      switchConservacao: ['']
    });
    this.getDonation();
    this.getPharmacy();
  }

  getDonation(): void {
    // this.id = +this.route.snapshot.paramMap.get('id');
    // if (this.id) {
    //   this.service.getOne(this.id)
    //     .subscribe(
    //       donation => {
    //         this.imageBase64Front = donation.pictureFile;
    //         this.imageBase64Back = donation.pictureFileBack;
    //         this.form.patchValue(donation);
    //       }
    //     );
    // }
  }




  submit() {
    const donation = this.form.value;
    donation.pictureFile = this.imageBase64Front;
    donation.pictureFileBack = this.imageBase64Back;

    console.log(this.checaDatasEConservacao(donation));
    if (this.checaDatasEConservacao(donation) != "validado!") {
      Swal.fire({
        title: 'Erro ao cadastrar a doação!',
        text: this.checaDatasEConservacao(donation),
        icon: 'error',
        confirmButtonText: `OK`,
      })
    } else {

      if (this.id) {
        // atualizar
        this.service.update(this.id, donation).subscribe(
          data => {
            Swal.fire({
              title: 'A doação foi atualizada com sucesso!',
              icon: 'success',
              confirmButtonText: `OK`,
            }),
              this.router.navigate(['usuarios/meu-perfil'])
          },
          erro => console.log(erro)
        );
      } else {
        console.log('Donation', donation);
        // cadastrar
        donation.statusId = 1;
        donation.userId = this.loggedUserId;
        this.service.store(donation).subscribe(
          data => {
            Swal.fire({
              title: 'A doação foi cadastrada com sucesso!',
              icon: 'success',
              confirmButtonText: `OK`,
            }),
              this.router.navigate(['usuarios/meu-perfil'])
          },
          erro => console.log(erro)
        );
      }
    }

  }

  checaDatasEConservacao(donation) {

    if (donation.shelfLife == "" || donation.manufacturyDate == "") {
      return "Erro! Data de validade ou fabricação estão em branco. Verifique os dados";
    } else if (donation.shelfLife < donation.manufacturyDate) {
      return "Erro! Data de validade é inferior a data de fabricação. Verifique os dados";
    } else if (new Date(donation.shelfLife) <= new Date()) {
      return "Erro! Medicamento já passou da Data de validade!";
    } else if (donation.switchConservacao != true) {
      return "Erro! Assegure-se da conservação da embalagem antes de prosseguir.";
    } else {
      return "validado!";
    }

  }

  handleFileInput(files: FileList, tipoImagem: string) {
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (tipoImagem == "Front") {
        this.imageBase64Front = reader.result;
      } if (tipoImagem == "Back") {
        this.imageBase64Back = reader.result;
      }
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

}
