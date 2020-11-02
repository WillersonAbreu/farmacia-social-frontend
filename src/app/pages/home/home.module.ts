import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutes } from './home.routing';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutes,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    ShowcaseComponent
  ]
})
export class HomeModule { }
