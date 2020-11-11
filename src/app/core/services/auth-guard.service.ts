import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import Swal from 'sweetalert2';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService
  ) { }

  canActivate(
    route?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot,
  ): boolean {
    const isAuthenticated: boolean = !!this.jwtService.getToken();
    if(!isAuthenticated){
      Swal.fire({
        icon: 'error',
        title: 'Você não está logado!',
        text: 'Faça login para acessar esta página!'
      });

      this.router.navigate(['/login']);
    }
    return isAuthenticated;
  }
}
