import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCloudUploadAlt, faPills, faPrescriptionBottle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { IUserType } from 'src/app/core/store/user/user.actions';
import { OrdersService } from 'src/app/pages/donations/orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donation-detail',
  templateUrl: './donation-detail.component.html',
  styleUrls: ['./donation-detail.component.css']
})
export class DonationDetailComponent implements OnInit {
  currentUser;
  id = 0;
  statusId = 0;

  faCloudUploadAlt = faCloudUploadAlt;
  faPrescriptionBottle = faPrescriptionBottle;
  faPills = faPills
  @Input() donationData: any;
  @Output() refreshList = new EventEmitter<boolean>();

  constructor(
    private ordersService: OrdersService,
    private store: Store<{ user: IUserType }>
  ) {
  }

  ngOnInit() {
    console.log(this.donationData);
  }

  submitReserve() {
    Swal.fire({
      title: 'Você quer mesmo realizar a reserva do medicamento?',
      text: 'Lembre-se, só poderá retirar o medicamento caso tenha posse de uma receita médica válida!',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: `Confirmar Reserva`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      // if (result.isConfirmed) {
      //   Swal.showLoading();
      //   this.ordersService.store(data).subscribe(
      //     data => {
      //       console.log(data);
      //       Swal.fire({
      //         title: 'A reserva foi realizada com um sucesso!',
      //         text: 'Lembre-se de levar a receita para poder retirar o medicamento!',
      //         icon: 'success',
      //         confirmButtonText: `OK`,
      //       });
      //       this.getOne();
      //     },
      //     erro => {
      //       console.log(erro),
      //       Swal.hideLoading();
      //     }
      //   );
      // } else if (result.isDenied) {
      //   Swal.fire('Medicamento não reservado', '', 'info')
      // }
    });
  }

}
