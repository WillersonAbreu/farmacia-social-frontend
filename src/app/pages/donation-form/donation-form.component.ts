import { Component, OnInit } from '@angular/core';

// FontAwsome Icons
import { faCloudUploadAlt, faPrescriptionBottle, faPills } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit {

  faCloudUploadAlt = faCloudUploadAlt;
  faPrescriptionBottle = faPrescriptionBottle;
  faPills = faPills

  constructor() { }

  ngOnInit() {
  }

}
