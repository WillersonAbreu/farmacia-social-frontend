import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { StyledButtonComponent } from './components/styled-button/styled-button.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { NgxViacepModule } from '@brunoc/ngx-viacep';

@NgModule({
  imports: [
    // BrowserModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgbModule,
    CarouselModule.forRoot(),
    NgxViacepModule
  ],
  declarations: [
    HeaderComponent,
    StyledButtonComponent,
    FooterComponent,
    CarouselComponent,
    SearchBarComponent

  ],

  exports: [
    HeaderComponent,
    StyledButtonComponent,
    FooterComponent,
    CarouselComponent,
    SearchBarComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },

  ],
})
export class CoreModule { }
