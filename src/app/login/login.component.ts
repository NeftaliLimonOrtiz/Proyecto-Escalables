import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // Importa el Router de Angular
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  template: `
<div class="container mt-5">
  <form (ngSubmit)="login()" class="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
    <h2 class="text-center mb-4">Iniciar Sesión</h2>

    <div class="form-group">
      <label for="user">Usuario:</label>
      <input type="text" id="user" [(ngModel)]="user" name="user" class="form-control" required>
    </div>

    <div class="form-group">
      <label for="password">Contraseña:</label>
      <input type="password" id="password" [(ngModel)]="password" name="password" class="form-control" required>
    </div>

    <button type="submit" class="btn btn-primary btn-block">Iniciar Sesión</button>
  </form>
</div>


  `
})
export class LoginComponent {
  user = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { } // Inyecta el Router

  login() {
    this.authService.login(this.user, this.password).subscribe(
      response => {
        const token = response.token;
        window.localStorage.setItem('token', token);
        this.userService.setAdminStatus(true);        
        this.router.navigate(['/landing']).then(() => {
          window.location.reload();
        });
      },
      error => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }
}

