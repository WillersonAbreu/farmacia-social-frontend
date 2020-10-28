import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DonationsComponent } from './pages/donations/donations.component';
import { DonationFormComponent } from './pages/donation-form/donation-form.component';
import { SignupComponent } from './pages/signup/signup.component';
import { QuestionComponent } from './pages/question/question.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'doações/cadastro', component: DonationFormComponent },
  { path: 'doação', component: DonationsComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'cadastro', component: SignupComponent },
  { path: 'duvidas', component: QuestionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
