import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { JwtService } from './jwt.service';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  protected baseUrl = 'http://localhost:8080';
  constructor(
    private api: HttpClient,
    private jwtService: JwtService
  ) { }
  // Verifique o JWT no armazenamento local com as informações do servidor e do usuário de carga.
  // Isso é executado uma vez na inicialização do aplicativo.
  public populate() {
    // Se o JWT for detectado, tente obter e armazenar as informações do usuário
    if (this.jwtService.getToken()) {
      this.api.get(this.baseUrl + '/login')
        .subscribe(
          data => {
            this.setAuth(data);
          },
          err => this.purgeAuth()
        );
    } else {
      // Remova qualquer possível remanescente de estados de autenticação anteriores
      this.purgeAuth();
    }
  }
  private setAuth(usuario) {
    // Defina os dados atuais do usuário em observáveis
    this.currentUserSubject.next(usuario);
    // Defina isAuthenticated como true
    this.isAuthenticatedSubject.next(true);
  }
  public purgeAuth() {
    // Remover JWT do localstorage
    this.jwtService.destroyToken();
    // Defina o usuário atual como um objeto vazio
    this.currentUserSubject.next({});
    // Defina o status de autenticação como falso
    this.isAuthenticatedSubject.next(false);
  }
  public login(credentials): Observable<any> {
    return this.api.post(this.baseUrl + '/login', credentials)
      .pipe(map(
        user => {
          // Salvar JWT enviado do servidor no localstorage
          this.jwtService.saveToken(user['token']);
          this.populate();
          return user;
        }
      ));
  }
  public getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}
