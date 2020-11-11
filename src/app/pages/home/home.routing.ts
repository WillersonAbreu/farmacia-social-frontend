import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { QuestionComponent } from '../question/question.component';
import { AboutComponent } from './about/about.component';
import { ConfirmRegisterComponent } from './confirm-register/confirm-register.component';
import { HomeComponent } from './home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupPharmacyComponent } from './signup-pharmacy/signup-pharmacy.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'sobre', component: AboutComponent },
      { path: 'duvidas', component: QuestionComponent },
      { path: 'meuPerfil', component: ProfileComponent },
      { path: 'farmacias/cadastrar', component: SignupPharmacyComponent },
      { path: 'confirm-register', component: ConfirmRegisterComponent },
      //  { path: 'doações/cadastro', component: DonationFormComponent },
      // { path: 'doação', component: DonationsComponent }
      // { path: 'esqueci-senha', component: ForgotPasswordComponent },
      // { path: 'reset-senha', component: ResetPasswordComponent },
    ]
  },
];

export const HomeRoutes = RouterModule.forChild(routes);
