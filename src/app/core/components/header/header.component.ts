import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
// FontAwsome Icons
import { faHome, faInfoCircle, faQuestion, faHeadset, faUserCircle, faSignInAlt, faUserPlus, faPrescriptionBottleAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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

  constructor(
    private route: Router,
    private jwtService: JwtService,
    private authService: AuthService
  ) { }

  public isAuthenticated: boolean = !!this.jwtService.getToken();
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
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faPrescriptionBottleAlt = faPrescriptionBottleAlt;
  faSignOutAlt = faSignOutAlt

  logout(): void {
    Swal.fire({
      icon: 'question',
      title: 'Deseja mesmo deslogar?',
      backdrop: true,
      cancelButtonText: 'Não',
      cancelButtonColor: 'red',
      showCancelButton: true,
      confirmButtonText: 'Sim',
    }).then(_yes => {
      this.authService.purgeAuth();
      this.jwtService.destroyToken();
      this.route.navigate(['/']);
    }).catch(_no => {
      return;
    });


  }

  ngOnInit(): void {
  }
}
