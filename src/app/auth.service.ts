import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(user: string, password: string): Observable<any> {
    const credentials = { user, password };

    return this.http.post<any>(this.apiUrl, credentials);
  }

  setToken(token?: string): void {
    window.localStorage.setItem(this.tokenKey, token || '');
  }

  getToken(): string | null {
    return window.localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    window.localStorage.removeItem(this.tokenKey);
  }

  getRole(): string | null {
    const token = this.getToken();
    console.log('Token:', token);
  
    if (!token) {
      return null;
    }
  
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded Token:', decodedToken);
      return decodedToken?.id || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    window.localStorage.removeItem('token');
  }

  getUserId(): string | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const decodedToken1=decodedToken.id
      return decodedToken1;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}

