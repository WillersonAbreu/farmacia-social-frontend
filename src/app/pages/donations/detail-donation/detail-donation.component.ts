import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// FontAwsome Icons
import { faCloudUploadAlt, faPrescriptionBottle, faPills } from '@fortawesome/free-solid-svg-icons';
import { DonationsService } from '../donations.service';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { IUserType } from 'src/app/core/store/user/user.actions';
import { OrdersService } from '../orders.service';

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

  faCloudUploadAlt = faCloudUploadAlt;
  faPrescriptionBottle = faPrescriptionBottle;
  faPills = faPills


  constructor(
    private service: DonationsService,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private store: Store<{ user: IUserType }>
  ) {
  }

  ngOnInit() {
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
        data => this.donation = data,
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
    this.ordersService.store(data).subscribe(
      data => console.log(data),
      erro => console.log(erro)
    );

  }

}
