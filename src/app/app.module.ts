import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from './pages/user/user.module';
import { HomeModule } from './pages/home/home.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    DonationsComponent,
    DonationFormComponent,
    CarouselComponent,
    StyledButtonComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    CarouselModule.forRoot(),
    NgbModule,
    HttpClientModule,
    UserModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
