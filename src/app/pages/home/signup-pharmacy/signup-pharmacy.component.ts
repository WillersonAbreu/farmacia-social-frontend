import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// Maps
import { MouseEvent } from "@agm/core";

// Services
import { PharmacyService } from 'src/app/core/services/pharmacyService.service';

// FontAwsome Icons
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



// Validators
import * as Yup from 'yup';
import {
  customYupCepValidator,
  customYupCnpjValidator,
  customYupPhoneValidator,
  formatCep,
  formatCnpj,
  formatPhone,
  pharmacySchemaValidator,
} from 'src/app/core/utils/formUserHelpers';

import { Endereco, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import { GeoLocationService } from 'src/app/core/services/geoLocationService.service';

// Call the custom methods to validate inputs
customYupCnpjValidator();
customYupCepValidator();
customYupPhoneValidator();

@Component({
  selector: 'app-signup',
  templateUrl: './signup-pharmacy.component.html',
  styleUrls: ['./signup-pharmacy.component.css']
})
export class SignupPharmacyComponent implements OnInit {
  showPassword: boolean = false;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  form: FormGroup;
  id: number;
  ocultaSenha: boolean;
  address: string;
  pharmacySchema = pharmacySchemaValidator();

  //Input masks
  phoneMask: string = '(00) 00000-0000';
  cepMask: string = '00000-000';
  cnpjMask: string = '00.000.000/0000-00'; //28.114.106/0001-35

  // Map variables
  zoom: number = 16;
  markers: marker[] = [];
  defaultLatitude: number;
  defaultLongitude: number;
  latitude: number;
  longitude: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: PharmacyService,
    private viacep: NgxViacepService,
    private geoLocationService: GeoLocationService
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      fantasyName: [''],
      email: [''],
      phone: [''],
      password: [''],
      cnpj: [''],
      pharmaceutical: [''],
      cep: [''],
      address: [''],
      number: [''],
      latitude: [''],
      longitude: ['']
    });

    // if(window.navigator.geolocation){
    //   window.navigator.geolocation
    //     .getCurrentPosition(
    //       (location) => {
    //         const {latitude, longitude } = location.coords;
    //         this.latitude = latitude;
    //         this.longitude = longitude;
    //       },
    //       (error) => {
    //         console.log(error)
    //       }, {
    //         enableHighAccuracy: true
    //       }
    //     );

    // }else{
      this.latitude = -22.578522274791556;
      this.longitude = -44.961761303964614;
    // }

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
      address = address.split(', ');

      if(address.length == 4){
        address[1] = target.value;
        this.form.controls.address.setValue(`${address[0]}, ${address[1]}, ${address[2]}, ${address[3]}`);
      }else{
        this.form.controls.address.setValue(`${address[0]}, ${target.value}, ${address[1]}, ${address[2]}`);
      }

      this.geoLocationService.getGeoLocation(`${address[0]}, ${target.value}, ${address[1]}, ${address[2]}`)
        .subscribe(
          (data: IResponse) => {
            const results = data.results[0];

            if(results.geometry.location.lat && results.geometry.location.lng){
              this.latitude = results.geometry.location.lat;
              this.longitude = results.geometry.location.lng;
              this.form.controls.latitude.setValue(this.latitude);
              this.form.controls.longitude.setValue(this.longitude);
            }

          },
          error => {
            console.log(error);
          }
        );
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'É necessário preencher o campo "Endereço" antes',
        text: 'Preencha o campo "Endereço automaticamente através do CEP ou manualmente'
      });
    }
  }

  mapClicked($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;

    this.form.controls.latitude.setValue(this.latitude);
    this.form.controls.longitude.setValue(this.longitude);
  }

  markerDragEnd($event: MouseEvent) {
    console.log("dragEnd", $event);
  }

  submit() {
    let pharmacy = this.form.value;

    this.pharmacySchema.validate(pharmacy, {abortEarly: false}).then(_success => {
      Swal.showLoading();
      // Format some input before save on database
      pharmacy.cep = formatCep(pharmacy.cep);
      pharmacy.cnpj = formatCnpj(pharmacy.cnpj);
      pharmacy.phone = formatPhone(pharmacy.phone);
      const [,,region] = pharmacy.address.split(",");
      pharmacy.region = region;

      // cadastrar
      this.service.store(pharmacy).subscribe(
        data => {
          Swal.fire({icon: 'success', title: data.message});
          this.router.navigate(['login']);
        },
        erro => {
        Swal.hideLoading();
          Swal.fire({icon: 'error', title: 'Erro ao cadastrar o usuário!', text: erro.error.message});
        }
      );

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

// just an interface for type safety.
interface marker {
  latitude: number;
  longitude: number;
  label?: string;
}

interface IResponse {
  results: any[],
  status: string
}
