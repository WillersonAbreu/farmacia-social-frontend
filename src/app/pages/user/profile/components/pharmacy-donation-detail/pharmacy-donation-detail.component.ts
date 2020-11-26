import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  faCloudUploadAlt,
  faPills,
  faPrescriptionBottle,
} from '@fortawesome/free-solid-svg-icons';
import { DonationStatusService } from 'src/app/core/services/donationStatusService.service';
import { PharmacyService } from 'src/app/core/services/pharmacyService.service';
import { DonationsService } from 'src/app/pages/donations/donations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmacy-donation-detail',
  templateUrl: './pharmacy-donation-detail.component.html',
  styleUrls: ['./pharmacy-donation-detail.component.css'],
})
export class PharmacyDonationDetailComponent implements OnInit {
  form: FormGroup;
  id: number;
  pharmacyList: any[];
  statusList: any[];
  imageBase64Front;
  imageBase64Back;
  @Input() isDoneDonations: boolean;
  @Input() donationData: any;
  @Output() refreshList = new EventEmitter<boolean>();

  faCloudUploadAlt = faCloudUploadAlt;
  faPrescriptionBottle = faPrescriptionBottle;
  faPills = faPills;

  maskDtNascimento = 'd0/M0/Y000';

  constructor(
    private service: DonationsService,
    private pharmacyService: PharmacyService,
    private statusService: DonationStatusService,
    private formBuilder: FormBuilder
  ) {}

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
      (data) => (this.pharmacyList = data),
      (err) => console.log(err)
    );

    this.statusService.getAll().subscribe(
      (data) => (this.statusList = data),
      (err) => console.log(err)
    );
  }

  getDonation(): void {
    this.id = this.donationData.id;

    this.form.patchValue(this.donationData);
    this.imageBase64Front = this.donationData.pictureFile;
    this.imageBase64Back = this.donationData.pictureFileBack;
  }

  onDone() {
    // this.form.controls.dosage.setValue(Number(this.form.controls.dosage.value));
    this.form.controls.statusId.setValue(5);

    this.submit();
  }

  onReprove() {
    const donation = this.form.value;
    donation.statusId = 4;

    this.submit();
  }

  onCancel() {
    const donation = this.form.value;
    donation.statusId = 6;

    this.submit();
  }

  submit() {
    const donation = this.form.value;
    donation.pictureFile = this.imageBase64Front;
    donation.pictureFileBack = this.imageBase64Back;
    donation.userId = Number(this.donationData.userId);

    if (this.id) {
      // atualizar
      this.service.update(donation.userId, donation).subscribe(
        (data) => {
          this.refreshList.emit(true);
          Swal.fire({
            icon: 'success',
            title: 'Anúncio atualizado',
            text: data.message,
          });
        },
        (erro) => {
          console.log(this.donationData);
        }
      );
    } else {
      // cadastrar
      return;
    }
  }
}
