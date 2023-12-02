import { Injectable } from '@angular/core';
import { tenis } from '../interfaces/tenis.interface';
import { Observable, switchMap } from 'rxjs'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from 'src/app/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TenisService {

  public tenis: tenis[] = [];

  constructor(private  http: HttpClient, private authService: AuthService) {
   }

   fetchTenisFromApi(searchTerm: string) :Observable<any>{
    return this.http.get(`http://localhost:8080/api/tenis?searchTerm=${searchTerm}`);
  }

  createTenis(tenis: tenis): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post("http://localhost:8080/api/tenis", tenis, { headers });
  }

  deleteTenis(tenisToDelete: tenis): Observable<tenis[]> {
    const headers = this.createHeaders();
    return this.http.delete(`http://localhost:8080/api/tenis/${tenisToDelete.id}`, { headers }).pipe(
      switchMap(() => this.fetchTenisFromApi(""))
    );
  }

  updateTenis(tenis: tenis): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put("http://localhost:8080/api/tenis/update", tenis, { headers });
  }
  
  getTenisDetails(tenisid: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`http://localhost:8080/api/tenis/details/${tenisid}`, { headers });
  }

  likeTenis(userName: string, tenisId: number): Observable<any> {
    const headers = this.createHeaders();
    const body = {
      userName: userName,
      tenisId: tenisId
    }; 
    console.log("prueba",body)
  
    return this.http.post(`http://localhost:8080/api/tenis/like/${tenisId}`, body);
  }

  
  

  public createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log(token)
    return new HttpHeaders({
      'Authorization': token || ''
    });
  }
}

