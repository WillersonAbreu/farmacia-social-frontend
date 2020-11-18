import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { JwtService } from './jwt.service';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { removeToken, saveToken } from '../store/auth/auth.actions';
import { JwtTokenHelpers } from '../utils/jwtTokenHelpers';
import { IUserType, removeUser } from '../store/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  protected baseUrl = 'http://localhost:8080/api';

  constructor(
    private api: HttpClient,
    private jwtService: JwtService,
    private store: Store<{ token: string }>,
    private userStore: Store<{ user: IUserType }>
  ) {
  }

  private jwtHelper = new JwtTokenHelpers(this.userStore);

  // Verifique o JWT no armazenamento local com as informações do servidor e do usuário de carga.
  // Isso é executado uma vez na inicialização do aplicativo.
  public populate(credentials) {
    // Se o JWT for detectado, tente obter e armazenar as informações do usuário
    if (this.jwtService.getToken()) {
      this.api.post(this.baseUrl + '/login', credentials)
        .subscribe(
          data => this.setAuth(data),
          err => this.purgeAuth()
        );
    } else {
      // Remova qualquer possível remanescente de estados de autenticação anteriores
      this.purgeAuth();
    }
  }

  private setAuth(usuario) {
    // Defina os dados atuais do usuário em observáveis
    // console.log(usuario.token);
    this.store.dispatch(saveToken(usuario));
    this.jwtHelper.decodeToken(usuario.token);
  }
  public purgeAuth() {
    // Remover JWT do localstorage
    this.jwtService.destroyToken();
    this.store.dispatch(removeToken());
    this.userStore.dispatch(removeUser());
  }
  public login(credentials): Observable<any> {
    return this.api.post(this.baseUrl + '/login', credentials)
      .pipe(map(
        user => {
          // Salvar JWT enviado do servidor no localstorage
          this.jwtService.saveToken(user['token']);
          this.populate(credentials);
          return user;
        }
      ));
  }

  public getUserData(): Observable<any> {
    return this.api.get(this.baseUrl + '/login');
  }

  public register(usuario): Observable<any> {
    return this.api.post(this.baseUrl + '/registro', usuario);
  }

  public confirmRegister(token: string): Observable<any> {
    const url = `${this.baseUrl}/confirm-registro`;
    return this.api.post(url, { token });
  }

  public esqueciSenha(email: string): Observable<any> {
    return this.api.post(this.baseUrl + '/esqueci-minha-senha', { email });
  }

  public resetaSenha(credencials): Observable<any> {
    return this.api.post(this.baseUrl + '/reseta-senha', credencials);
  }
  public contato(contato): Observable<any> {
    return this.api.post(this.baseUrl + '/contatos', contato);
  }

}
