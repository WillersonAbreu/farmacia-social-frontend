import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserService } from './user.service';
import { UserRoutes } from './user.routing';
import { FormUserComponent } from './form-user/form-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutes,
    ReactiveFormsModule
  ],
  declarations: [
    UserComponent,
    DetailUserComponent,
    ListUsersComponent,
    FormUserComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
