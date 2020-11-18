import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// FontAwsome Icons
import { faCloudUploadAlt, faPrescriptionBottle, faPills } from '@fortawesome/free-solid-svg-icons';
import { DonationsService } from '../donations.service';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { IUserType } from 'src/app/core/store/user/user.actions';
import { OrdersService } from '../orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-donation',
  templateUrl: './detail-donation.component.html',
  styleUrls: ['./detail-donation.component.css']
})
export class DetailDonationComponent implements OnInit {

  donation: {};
  doacaoSelecionada = 0;
  currentUser;
  id = 0;
  statusId = 0;
  url = "/doacoes/";

  faCloudUploadAlt = faCloudUploadAlt;
  faPrescriptionBottle = faPrescriptionBottle;
  faPills = faPills


  constructor(
    private service: DonationsService,
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private store: Store<{ user: IUserType }>
  ) {
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.getOne();

    const reduxUser = this.store.select('user');
    reduxUser.subscribe(
      res => {
        this.id = res.id,
          console.log("o id é: " + this.id)
      },
      err => console.log(err)
    )
  }

  getOne() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.doacaoSelecionada = id;
      this.service.getOne(id).subscribe(
        data => {
          this.donation = data,
            this.statusId = data.statusId,
            console.log("o status é: " + this.statusId)
        },
        erro => console.log(erro)
      );
    });
  }

  submitReserve() {

    const data = {
      "userId": this.id,
      "medicineDonationId": this.doacaoSelecionada
    };

    console.log(data);
    //Reservar a doação

    Swal.fire({
      title: 'Você quer mesmo realizar a reserva do medicamento?',
      text: 'Lembre-se, só poderá retirar o medicamento caso tenha posse de uma receita médica válida!',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: `Confirmar Reserva`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.ordersService.store(data).subscribe(
          data => {
            console.log(data);
            Swal.fire({
              title: 'A reserva foi realizada com um sucesso!',
              text: 'Lembre-se de levar a receita para poder retirar o medicamento!',
              icon: 'success',
              confirmButtonText: `OK`,
            });
            this.router.navigate(['/doacoes', this.doacaoSelecionada],);

          },
          erro => console.log(erro)
        );

      } else if (result.isDenied) {
        Swal.fire('Medicamento não reservado', '', 'info')
      }
    })


  }

}
