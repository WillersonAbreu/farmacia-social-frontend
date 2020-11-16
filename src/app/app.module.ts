import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// NGX Bootstrap components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { UserModule } from './pages/user/user.module';
import { HomeModule } from './pages/home/home.module';
import { DonationsModule } from './pages/donations/donation.module';

// Redux
import { Store, StoreModule } from '@ngrx/store';
import { authReducer } from './core/store/auth/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { userReducer } from './core/store/user/user.reducer';
import { JwtService } from './core/services/jwt.service';
import { JwtTokenHelpers } from './core/utils/jwtTokenHelpers';
import { IUserType } from './core/store/user/user.actions';
import { saveToken } from './core/store/auth/auth.actions';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    UserModule,
    HomeModule,
    DonationsModule,
    StoreModule.forRoot({
      token: authReducer,
      user: userReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  private jwtHelper = new JwtTokenHelpers(this.userStore);
  constructor(
    private jwtService: JwtService,
    private jwtStore: Store<{ token: string }>,
    private userStore: Store<{ user: IUserType }>
  ){
    const token = this.jwtService.getToken();

    if(!!token){
      const isTokenStored = this.jwtHelper.decodeToken(token);
      if(!isTokenStored){
        this.jwtService.destroyToken();
        return;
      };
      this.jwtStore.dispatch(saveToken({token}));
    }else{
      this.jwtService.destroyToken();
    }
  }
}

interface ICustomToken {
  token: {
    token: string;
  }
}
