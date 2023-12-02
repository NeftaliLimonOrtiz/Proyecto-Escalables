import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tienda-de-tenis';
  constructor(private authService: AuthService, private router : Router) {}

/*
  constructor (private router : Router){

  }

  public get isTenissRoute(): boolean{
    return this.router.url == "/tenis"
  }
*/


}
