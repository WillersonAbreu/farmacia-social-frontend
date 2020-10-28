import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DonationsComponent } from './pages/donations/donations.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AboutComponent } from './pages/about/about.component';
import { DonationFormComponent } from './pages/donation-form/donation-form.component';

// NGX Bootstrap components
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { StyledButtonComponent } from './components/styled-button/styled-button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ShowcaseComponent } from './pages/home/components/showcase/showcase.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './pages/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    DonationsComponent,
    DonationFormComponent,
    SignupComponent,
    CarouselComponent,
    StyledButtonComponent,
    SearchBarComponent,
    ShowcaseComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    CarouselModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
