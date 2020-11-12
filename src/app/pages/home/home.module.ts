import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutes } from './home.routing';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupPharmacyComponent } from './signup-pharmacy/signup-pharmacy.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { CoreModule } from 'src/app/core/core.module';
import { AboutComponent } from './about/about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionComponent } from './question/question.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

import { AgmCoreModule } from '@agm/core';
import { GOOGLE_MAPS_API_KEY } from 'src/app/core/config/global';
// import { ProfileComponent } from '../profile/profile.component';
import { ContatoComponent } from './contato/contato.component';
import { ConfirmRegisterComponent } from './confirm-register/confirm-register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutes,
    ReactiveFormsModule,
    CoreModule,
    FontAwesomeModule,
    NgbModule,
    CarouselModule.forRoot(),
    PaginatorModule,
    NgxMaskModule.forRoot(maskConfig),
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAPS_API_KEY,
      libraries: ['places']
    }),
  ],
  declarations: [
    HomeComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    SignupPharmacyComponent,
    ConfirmRegisterComponent,
    ShowcaseComponent,
    AboutComponent,
    QuestionComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ContatoComponent,
  ]
})
export class HomeModule { }
