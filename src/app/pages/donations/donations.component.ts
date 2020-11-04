import { Component, OnInit } from '@angular/core';

// FontAwsome Icons
import { faCloudUploadAlt, faPrescriptionBottle, faPills } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  faCloudUploadAlt = faCloudUploadAlt;
  faPrescriptionBottle = faPrescriptionBottle;
  faPills = faPills

  constructor() { }

  ngOnInit(): void {
  }

}
