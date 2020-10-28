import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptors';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

@NgModule({
    imports: [
        RouterModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
    ],

    exports: [
        HeaderComponent,
        FooterComponent,
    ],
    providers: [
        AuthGuard,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },


    ],
})
export class CoreModule { }
