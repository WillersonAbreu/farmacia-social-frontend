import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationsComponent } from './donations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonationsRoutes } from './donations.routing';
import { CoreModule } from 'src/app/core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailDonationComponent } from './detail-donation/detail-donation.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { ListDonationsComponent } from './list-donations/list-donations.component';
import { DonationsService } from './donations.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DonationsRoutes,
    ReactiveFormsModule,
    CoreModule,
    FontAwesomeModule,
    CarouselModule.forRoot(),
  ],
  declarations: [
    DonationsComponent,
    DetailDonationComponent,
    DonationFormComponent,
    ListDonationsComponent
  ],
  providers: [
    DonationsService
  ]
})

export class DonationsModule { }