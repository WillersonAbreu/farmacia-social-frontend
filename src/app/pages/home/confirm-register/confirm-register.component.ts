import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css']
})
export class ConfirmRegisterComponent implements OnInit {
  token: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      /* tslint:disable:no-string-literal */
      this.token = params['token'];
      this.authService.confirmRegister(this.token)
        .subscribe(
          usuario => this.success(usuario),
          err => {
            Swal.close();
            this.router.navigateByUrl('/login');
          }
        );
    });
  }

  success(usuario) {
    let timerInterval;
    Swal.fire({
      title: 'Olá, ' + usuario.name,
      text: 'Você está autenticado no sistema.',
      timer: 4000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector('b');
            if (b) {
              const val = Swal.getTimerLeft();
              b.textContent = val.toString();
            }
          }
        }, 1000);
      },
      onClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.router.navigateByUrl('/login');
      }
    });
  }

}
