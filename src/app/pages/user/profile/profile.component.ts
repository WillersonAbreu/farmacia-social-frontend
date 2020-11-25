import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { Endereco, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import Swal from 'sweetalert2';
import { formatCep,customYupCepValidator, customYupCpfValidator, customYupPhoneValidator, formatCpf, formatPhone, updateUserSchemaValidator, formatCnpj, updatePharmacySchemaValidator } from 'src/app/core/utils/formUserHelpers';
import { Store } from '@ngrx/store';
import { IUserType } from 'src/app/core/store/user/user.actions';
import * as Yup from 'yup';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { IResponse, marker } from '../../home/signup-pharmacy/signup-pharmacy.component';
import { PharmacyService } from 'src/app/core/services/pharmacyService.service';
import { GeoLocationService } from 'src/app/core/services/geoLocationService.service';

// Maps
import { MouseEvent } from "@agm/core";
import { ReservedDonationsServiceService } from 'src/app/core/services/reservedDonationsService.service';
import { DonationsService } from '../../donations/donations.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';

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
  pharmacyForm: FormGroup;
  id: number;
  reservedDonationsList: [];
  donationsList: [];
  pendentDonations: [];
  doneDonations: [];
  userSchema = updateUserSchemaValidator();
  pharmacySchema = updatePharmacySchemaValidator();
  userType: number;
  selectedDoantion: any = {};

  //Input masks
  phoneMask: string = '(00) 00000-0000';
  cepMask: string = '00000-000';
  cpfMask: string = '000.000.000-00';
  cnpjMask: string = '00.000.000/0000-00';

  // Map variables
  zoom: number = 16;
  markers: marker[] = [];
  defaultLatitude: number;
  defaultLongitude: number;
  latitude: number;
  longitude: number;
  modalRef: BsModalRef;


  constructor(
    private viacep: NgxViacepService,
    private formBuilder: FormBuilder,
    private router: Router,
    private service: UserService,
    private pharmacyService: PharmacyService,
    private reservedDonationService: ReservedDonationsServiceService,
    private donationsService: DonationsService,
    private geoLocationService: GeoLocationService,
    private store: Store<{ user: IUserType }>,
    private modalService: BsModalService
  ) {
    const reduxUser = this.store.select('user');
    reduxUser.subscribe(
      res => {
        this.id = res.id,
        this.userType = res.roleId
      },
      err => err
    );
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

    this.pharmacyForm = this.formBuilder.group({
      address: [''],
      cep: [''],
      cnpj: [''],
      email: [''],
      fantasyName: [''],
      latitude: [''],
      longitude: [''],
      pharmaceutical: [''],
      phone: [''],
      region: [''],
      password: [''],
      number: ['']
    });

    if(this.userType === 1){
      this.service.getOne(this.id).subscribe(
        userData => {
          this.form.patchValue(userData);
          let address = userData.address;
          let target = { value: ''};

          if (address.length > 0) {
            address = address.split(', ');

            if (address.length == 4) {
              target.value = address[1];
              this.form.controls.number.setValue(`${address[1]}`);
              this.setNumberOnAddress(target);
            }
          }
        }
      );
    }else{
      this.pharmacyService.getOne(this.id).subscribe(
        userData => {
          console.log(userData);
          this.pharmacyForm.patchValue(userData);
          let address = userData.address;
          let target = { value: ''};

          if (address.length > 0) {
            address = address.split(', ');

            if (address.length == 4) {
              target.value = address[1];
              this.pharmacyForm.controls.number.setValue(`${address[1]}`);
              this.setNumberOnPharmacyAddress(target);
            }
          }
        }
      );
    }

    this.getAllDonations();

    this.latitude = -22.578522274791556;
    this.longitude = -44.961761303964614;
  }

  @Output() getAllDonations(){
    //Get the list of done donations

    // Get the list of reserved donations
    const myReservedDonations = this.reservedDonationService.findAllById(this.id);
    myReservedDonations.subscribe(reservedDonations => {
      this.reservedDonationsList = reservedDonations;
    });

    // Get the list my donations
    const myDonations = this.donationsService.findAllById(this.id);
    myDonations.subscribe(donations => {
      this.donationsList = donations;
    });
  }

  handlePasswordInput(): boolean {
    this.showPassword = !this.showPassword;
    return this.showPassword;
  }

  getAddressData(target): void {
    this.viacep.buscarPorCep(target.value).then((endereco: Endereco) => {
      const { logradouro, bairro, localidade, uf } = endereco;
      // Injecting the address string to the input
      if(this.userType === 1){
        this.form.controls.address.setValue(`${logradouro}, ${bairro}, ${localidade} - ${uf}`);
      }else{
        this.pharmacyForm.controls.address.setValue(`${logradouro}, ${bairro}, ${localidade} - ${uf}`);
      }
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

  setNumberOnPharmacyAddress(target): void {
    let address = this.pharmacyForm.controls.address.value;

    if (address.length > 0) {
      address = address.split(', ');

      if (address.length == 4) {
        address[1] = target.value;
        this.pharmacyForm.controls.address.setValue(`${address[0]}, ${address[1]}, ${address[2]}, ${address[3]}`);
      } else {
        this.pharmacyForm.controls.address.setValue(`${address[0]}, ${target.value}, ${address[1]}, ${address[2]}`);
      }
      this.geoLocationService.getGeoLocation(`${address[0]}, ${target.value}, ${address[1]}, ${address[2]}`)
        .subscribe(
          (data: IResponse) => {
            const results = data.results[0];
            if(results.geometry.location.lat && results.geometry.location.lng){
              this.latitude = results.geometry.location.lat;
              this.longitude = results.geometry.location.lng;
              this.pharmacyForm.controls.latitude.setValue(this.latitude);
              this.pharmacyForm.controls.longitude.setValue(this.longitude);
            }
          },
          error => {
            return error;
          }
        );
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

  mapClicked($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;

    this.pharmacyForm.controls.latitude.setValue(this.latitude);
    this.pharmacyForm.controls.longitude.setValue(this.longitude);
  }

  markerDragEnd($event: MouseEvent) {
    return null;
  }


  openModal(template: TemplateRef<any>, isReservedDonation?: boolean) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, {class: isReservedDonation ? 'modal-xl' : 'modal-lg' })
    );
  }

  closeModal() {
    this.modalRef.hide();
  }

  setModalData(donation){
    this.selectedDoantion = donation;
  }

  userSubmit() {
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
          erro => erro
        );
      })
      .catch(err => {
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

  pharmacySubmit() {
    let pharmacy = this.pharmacyForm.value;

    let cleanCnpj = pharmacy.cnpj.split('.').join('');
    cleanCnpj = cleanCnpj.split('-').join('');

    let cleanPhone = pharmacy.phone.split('(').join('');
    cleanPhone = cleanPhone.split(')').join('');
    cleanPhone = cleanPhone.split('-').join('');
    cleanPhone = cleanPhone.split(' ').join('');

    let cleanCep = pharmacy.cep.split('-').join('');

    pharmacy.cnpj = cleanCnpj;
    pharmacy.phone = cleanPhone;
    pharmacy.cep = cleanCep;

    if(this.id) {
    this.pharmacySchema.validate(pharmacy, {abortEarly: false}).then(_success => {
      Swal.showLoading();
      // Format some input before save on database
      pharmacy.cep = formatCep(pharmacy.cep);
      pharmacy.cnpj = formatCnpj(pharmacy.cnpj);
      pharmacy.phone = formatPhone(pharmacy.phone);
      const [,,region] = pharmacy.address.split(",");
      pharmacy.region = region;

      // cadastrar
      this.pharmacyService.update(this.id, pharmacy).subscribe(
        data => {
          Swal.fire({icon: 'success', title: data.message});
        },
        erro => {
        Swal.hideLoading();
          Swal.fire({icon: 'error', title: 'Erro ao atualizar os dados!', text: erro.error.message});
        }
      );
    })
    .catch(err => {
      if(err instanceof Yup.ValidationError){
        err.inner.forEach((error) => {
          this.pharmacyForm.controls[error.path].setErrors(error.message);
        });
      }
    });
  }else {
    Swal.fire({
      icon: 'warning',
      title: 'É necessário estar logado para realizar alteração.',
      //text: 'Preencha o campo "Endereço automaticamente através do CEP ou manualmente'
    });
  }
  }

}
