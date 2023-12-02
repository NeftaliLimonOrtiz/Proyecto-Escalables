import { Injectable } from '@angular/core';
import { news } from '../interfaces/news.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public news: news[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchNewsFromApi(searchTerm: string) :Observable<any>{
    return this.http.get(`http://localhost:8080/api/news?searchTerm=${searchTerm}`);
  }
  
  createNews(news: news): Observable<any> {
    const headers = this.createHeaders();

    return this.http.post('http://localhost:8080/api/news', news, { headers });
  }

  deleteNews(newsToDelete: news): Observable<news[]> {
    const headers = this.createHeaders();

    return this.http.delete(`http://localhost:8080/api/news/${newsToDelete.id}`, { headers }).pipe(
      switchMap(() => this.fetchNewsFromApi(''))
    );
  }

  updateNews(news: news): Observable<any> {
    const headers = this.createHeaders();

    return this.http.put('http://localhost:8080/api/news/update', news, { headers });
  }

  getNewsDetails(newsid: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`http://localhost:8080/api/news/details/${newsid}`, { headers });
  }

  markNewsAsRead(newsId: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`http://localhost:8080/api/news/mark-as-read/${newsId}`, { headers });
  }

  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', token || '');
  }

  
}
