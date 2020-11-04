import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// FontAwsome Icons
import { faCloudUploadAlt, faPrescriptionBottle, faPills } from '@fortawesome/free-solid-svg-icons';
import { DonationsService } from '../donations.service';

@Component({
  selector: 'app-detail-donation',
  templateUrl: './detail-donation.component.html',
  styleUrls: ['./detail-donation.component.css']
})
export class DetailDonationComponent implements OnInit {

  donation: {};

  faCloudUploadAlt = faCloudUploadAlt;
  faPrescriptionBottle = faPrescriptionBottle;
  faPills = faPills


  constructor(
    private service: DonationsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.service.getOne(id).subscribe(
        data => this.donation = data,
        erro => console.log(erro)
      );
    });
  }

}
