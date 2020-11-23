import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { UserRoutes } from './user.routing';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './profile/profile.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AgmCoreModule } from '@agm/core';
import { GOOGLE_MAPS_API_KEY } from 'src/app/core/config/global';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DonationFormComponent } from './profile/components/donation-form/donation-form.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    UserRoutes,
    ReactiveFormsModule,
    CoreModule,
    NgxViacepModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAPS_API_KEY,
      libraries: ['places']
    })
  ],
  declarations: [
    UserComponent,
    ProfileComponent,
    DonationFormComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
