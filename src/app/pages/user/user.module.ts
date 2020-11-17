import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserService } from './user.service';
import { UserRoutes } from './user.routing';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './profile/profile.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { FormUserComponent } from './form-user/form-user.component';

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
  ],
  declarations: [
    UserComponent,
    DetailUserComponent,
    ListUsersComponent,
    ProfileComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
