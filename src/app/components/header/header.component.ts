import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
// FontAwsome Icons
import { faHome, faInfoCircle, faQuestion, faHeadset, faUserCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    //Define animation here
    trigger("animation", [
      state("hide", style({ height: '0px' })),
      state("show", style({ height: '250px' })),

      transition('hide <=> show', animate('300ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  public isMenuCollapsed = true;

  state: string = "hide";

  animateMe() {
    this.state = (this.state === 'hide' ? 'show' : 'hide');
  }


  faHome = faHome;
  faInfoCircle = faInfoCircle;
  faQuestion = faQuestion;
  faHeadset = faHeadset;
  faUserCircle = faUserCircle;

  constructor() { }

  ngOnInit(): void {

  }



}
