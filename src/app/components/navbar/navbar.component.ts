import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin: boolean = false;


  constructor(private router : Router, public authService: AuthService, public userService: UserService){}

  public get isTenisRoute(): boolean{
    return this.router.url == "/tenis"
  }

  ngOnInit(): void {
    this.userService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      
    });
    this.assignUserRole();
  }

  private assignUserRole(): void {
    const role = this.authService.getRole();
    console.log('Role:', role);    
    this.isAdmin = role === 'admin';  
    this.userService.setAdminStatus(this.isAdmin);
  }
  

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/landing']).then(() => {
      window.location.reload();
    });
  }

}
