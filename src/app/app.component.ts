import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{
  title = 'farmacia-social-frontend';
  constructor(
    private userService: AuthService
    ){

    }

    ngOnInit(){
      this.userService.populate();
    }
}

