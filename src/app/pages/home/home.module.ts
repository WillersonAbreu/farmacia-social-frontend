import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutes } from './home.routing';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { CoreModule } from 'src/app/core/core.module';
import { AboutComponent } from './about/about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionComponent } from '../question/question.component';
import { NgbModule, NgbPanel } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProfileComponent } from '../profile/profile.component';
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
  ],
  declarations: [
    HomeComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    ConfirmRegisterComponent,
    ShowcaseComponent,
    AboutComponent,
    QuestionComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
