import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// FontAwsome Icons
import { faCloudUploadAlt, faPrescriptionBottle, faPills } from '@fortawesome/free-solid-svg-icons';
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

  faCloudUploadAlt = faCloudUploadAlt;
  faPrescriptionBottle = faPrescriptionBottle;
  faPills = faPills

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: DonationsService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      // pictureFile: ['', Validators.required],
      // pictureFileBack: ['', Validators.required],
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
      statusId: ['', Validators.required],
    });
    this.getDonation();
  }

  getDonation(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.getOne(this.id)
        .subscribe(
          donation => {
            this.imageBase64Front = donation.pictureFile;
            this.imageBase64Back = donation.pictureFileBack;
            this.form.patchValue(donation);
          }
        );
    }
  }

  submit() {
    const donation = this.form.value;
    console.log(donation);
    donation.pictureFile = this.imageBase64Front;
    donation.pictureFileBack = this.imageBase64Back;

    if (this.id) {
      // atualizar
      this.service.update(this.id, donation).subscribe(
        data => this.router.navigate(['doacoes']),
        erro => console.log(erro)
      );
    } else {
      // cadastrar
      this.service.store(donation).subscribe(
        data => this.router.navigate(['doacoes']),
        erro => console.log(erro)
      );
    }
  }


  handleFileInput(files: FileList, tipoImagem: string) {
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log(reader.result);
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
