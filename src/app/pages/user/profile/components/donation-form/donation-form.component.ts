import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faCloudUploadAlt, faPills, faPrescriptionBottle } from '@fortawesome/free-solid-svg-icons';
import { DonationStatusService } from 'src/app/core/services/donationStatusService.service';
import { PharmacyService } from 'src/app/core/services/pharmacyService.service';
import { DonationsService } from 'src/app/pages/donations/donations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit {
  form: FormGroup;
  id: number;
  pharmacyList: any[];
  statusList: any[];
  imageBase64Front;
  imageBase64Back;
  @Input() donationData: any;
  @Output() refreshList = new EventEmitter<boolean>();


  faCloudUploadAlt = faCloudUploadAlt;
  faPrescriptionBottle = faPrescriptionBottle;
  faPills = faPills

  maskDtNascimento = 'd0/M0/Y000';

  constructor(
    private service: DonationsService,
    private pharmacyService: PharmacyService,
    private statusService: DonationStatusService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [''],
      pictureFile: [''],
      pictureFileBack: [''],
      description: [''],
      stripe: [''],
      packing: [''],
      amount: [''],
      dosage: [''],
      manufacturyDate: [''],
      shelfLife: [''],
      batchCode: [''],
      userId: [''],
      pharmacyId: [''],
      statusId: [''],
    });
    this.getDonation();

    this.pharmacyService.getAll().subscribe(
      data => this.pharmacyList = data,
      err => console.log(err)
    );

    this.statusService.getAll().subscribe(
      data => this.statusList = data,
      err => console.log(err)
    );

  }

  getDonation(): void {
    this.id = this.donationData.id;

    this.form.patchValue(this.donationData);
    this.imageBase64Front = this.donationData.pictureFile;
    this.imageBase64Back = this.donationData.pictureFileBack;
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

  deleteConfirm(id: number, nome: string) {
    Swal.fire({
      title: 'Você tem certeza que quer deletar a doação de ' + nome + '?',
      text: 'Essa alteração é irrevesível!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id, nome);
      }
    });
  }

  delete(id: number, nome) {
    this.service.delete(id).subscribe(
      data => {
        Swal.fire(
          'Deletada com sucesso!',
          'A doação ' + nome + ' foi deletada com exito!',
          'success'
        );
        this.refreshList.emit(true);
      },
      erro => {
        Swal.fire({
          icon: 'error',
          title: 'Aconteceu um erro ao deletar a doação',
          text: erro + '',
        });
      }
    );
  }

  submit() {
    const donation = this.form.value;
    donation.pictureFile = this.imageBase64Front;
    donation.pictureFileBack = this.imageBase64Back;

    if (this.id) {
      // atualizar
      this.service.update(this.id, donation).subscribe(
        data => {
          this.refreshList.emit(true);
          Swal.fire({icon: 'success', title: 'Anúncio atualizado', text: data.message});
          // this.refreshList();
        },
        erro => console.log(erro)
      );
    } else {
      // cadastrar
      return
    }
  }

}
