import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// NGX Bootstrap components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { UserModule } from './pages/user/user.module';
import { HomeModule } from './pages/home/home.module';
import { DonationsModule } from './pages/donations/donation.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    UserModule,
    HomeModule,
    DonationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
