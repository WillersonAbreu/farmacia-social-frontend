import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
// FontAwsome Icons
import {
  faHome,
  faInfoCircle,
  faQuestion,
  faHeadset,
  faUserCircle,
  faSignInAlt,
  faUserPlus,
  faPrescriptionBottleAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { IUserType } from '../../store/user/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    //Define animation here
    trigger('animation', [
      state('hide', style({ height: '0px' })),
      state('show', style({ height: '250px' })),

      transition('hide <=> show', animate('300ms ease-in')),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  public isAuthenticated: boolean = false;
  public userType: number;

  constructor(
    private route: Router,
    private jwtService: JwtService,
    private authService: AuthService,
    private store: Store<{ user: IUserType }>
  ) {
    const reduxUser = this.store.select('user');
    reduxUser.subscribe(
      (res) => {
        this.isAuthenticated = res.isAuthenticated
        this.userType = res.roleId;
      },
      (err) => console.log(err)
    );
  }

  public isMenuCollapsed = true;

  state: string = 'hide';

  animateMe() {
    this.state = this.state === 'hide' ? 'show' : 'hide';
  }

  faHome = faHome;
  faInfoCircle = faInfoCircle;
  faQuestion = faQuestion;
  faHeadset = faHeadset;
  faUserCircle = faUserCircle;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faPrescriptionBottleAlt = faPrescriptionBottleAlt;
  faSignOutAlt = faSignOutAlt;

  logout(): void {
    Swal.fire({
      icon: 'question',
      title: 'Deseja mesmo deslogar?',
      backdrop: true,
      cancelButtonText: 'Não',
      cancelButtonColor: 'red',
      showCancelButton: true,
      confirmButtonText: 'Sim',
    }).then((result) => {
      console.log('Sim', result);
      if(result.isConfirmed){
        this.authService.purgeAuth();
        this.jwtService.destroyToken();
        this.route.navigate(['/']);
      }else{
        return;
      }
    });
  }

  ngOnInit(): void {}
}
