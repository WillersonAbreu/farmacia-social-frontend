import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationsComponent } from './donations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonationsRoutes } from './donations.routing';
import { CoreModule } from 'src/app/core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailDonationComponent } from './detail-donation/detail-donation.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { DonationsService } from './donations.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AgmCoreModule } from '@agm/core';
import { GOOGLE_MAPS_API_KEY } from 'src/app/core/config/global';
@NgModule({
  imports: [
    TabsModule.forRoot(),
    CommonModule,
    FormsModule,
    DonationsRoutes,
    ReactiveFormsModule,
    CoreModule,
    FontAwesomeModule,
    CarouselModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAPS_API_KEY,
      libraries: ['places']
    }),
  ],
  declarations: [
    DonationsComponent,
    DetailDonationComponent,
    DonationFormComponent,
  ],
  providers: [
    DonationsService
  ]
})

export class DonationsModule { }
