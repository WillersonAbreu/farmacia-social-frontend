import { Component, OnInit } from '@angular/core';

// FontAwsome Icons
import { faHome, faInfoCircle, faQuestion, faHeadset, faUserCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faHome = faHome;
  faInfoCircle = faInfoCircle;
  faQuestion = faQuestion;
  faHeadset = faHeadset;
  faUserCircle = faUserCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
