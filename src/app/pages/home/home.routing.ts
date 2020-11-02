import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { DonationsComponent } from './donations/donations.component';
import { HomeComponent } from './home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'cadastrar', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'sobre', component: AboutComponent },
      { path: 'doações/cadastro', component: DonationFormComponent },
      { path: 'doação', component: DonationsComponent }
      // { path: 'esqueci-senha', component: ForgotPasswordComponent },
      // { path: 'reset-senha', component: ResetPasswordComponent },
      // { path: 'confirm-register', component: ConfirmRegisterComponent },
    ]
  },
];

export const HomeRoutes = RouterModule.forChild(routes);
