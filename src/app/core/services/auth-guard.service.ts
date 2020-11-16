import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from './jwt.service';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { IUserType } from '../store/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private userStore: Store<{ user: IUserType }>
  ) {
    const reduxUser = this.userStore.select('user');
    reduxUser.subscribe(
      (res) => this.isAuthenticated = res.isAuthenticated,
      (err) => null
    );
   }

  canActivate(
    route?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot,
  ): boolean {


    if(!this.isAuthenticated){
      Swal.fire({
        icon: 'error',
        title: 'Você não está logado!',
        text: 'Faça login para acessar esta página!'
      });

      this.router.navigate(['/login']);
    }
    return this.isAuthenticated;
  }
}
