import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// FontAwsome Icons
import {
  faCloudUploadAlt,
  faPrescriptionBottle,
  faPills,
} from '@fortawesome/free-solid-svg-icons';
import { DonationsService } from '../donations.service';
import { Store } from '@ngrx/store';
import { IUserType } from 'src/app/core/store/user/user.actions';
import { OrdersService } from '../orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-donation',
  templateUrl: './detail-donation.component.html',
  styleUrls: ['./detail-donation.component.css'],
})
export class DetailDonationComponent implements OnInit {
  donation: IDonation;
  doacaoSelecionada = 0;
  currentUser;
  id = 0;
  statusId: number = 0;
  url = '/doacoes/';

  faCloudUploadAlt = faCloudUploadAlt;
  faPrescriptionBottle = faPrescriptionBottle;
  faPills = faPills;

  // Map variables
  latitude: number;
  longitude: number;
  zoom: number = 16;

  constructor(
    private service: DonationsService,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private store: Store<{ user: IUserType }>
  ) {}

  ngOnInit() {
    this.getOne();

    const reduxUser = this.store.select('user');
    reduxUser.subscribe(
      (res) => {
        this.id = res.id;
      },
      (err) => console.log(err)
    );
  }

  getOne() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.doacaoSelecionada = id;
      this.service.getOne(id).subscribe(
        (data) => {
          this.donation = data;
          this.statusId = data.statusId;
          this.latitude = Number(data.pharmacy.latitude);
          this.longitude = Number(data.pharmacy.longitude);
        },
        (erro) => console.log(erro)
      );
    });
  }

  submitReserve() {
    const data = {
      userId: this.id,
      medicineDonationId: this.doacaoSelecionada,
    };

    console.log(data);
    //Reservar a doação

    Swal.fire({
      title: 'Você quer mesmo realizar a reserva do medicamento?',
      text:
        'Lembre-se, só poderá retirar o medicamento caso tenha posse de uma receita médica válida!',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: `Confirmar Reserva`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        this.ordersService.store(data).subscribe(
          (data) => {
            Swal.fire({
              title: 'A reserva foi realizada com um sucesso!',
              text:
                'Lembre-se de levar a receita para poder retirar o medicamento!',
              icon: 'success',
              confirmButtonText: `OK`,
            });
            //  this.router.navigate(['/doacoes', this.doacaoSelecionada],);
            this.getOne();
          },
          (erro) => {
            console.log(erro), Swal.hideLoading();
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Medicamento não reservado', '', 'info');
      }
    });
  }
}

interface IDonation {
  amount: number;
  batchCode: number | string;
  createdAt: number;
  description: string;
  dosage: number | string;
  id: number;
  isActive: boolean;
  manufacturyDate: string;
  packing: string;
  pharmacy: {};
  pharmacyId: number;
  pictureFile: string;
  pictureFileBack: string;
  reservedDonation: null;
  shelfLife: string;
  status: {};
  statusId: number;
  stripe: string;
  title: string;
  user: {};
  userId: number;
}
