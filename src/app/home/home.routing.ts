import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LandingPageComponent }, // http://localhost:4200/
      { path: 'login', component: LoginComponent } // http://localhost:4200/login
    ]
  }

];

export const HomeRoutes = RouterModule.forChild(routes);
