// like.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikeService {

  constructor(private  http: HttpClient,) {
  }

  public likedTenis: Set<number> = new Set<number>();
  public newsRead: Set<number> = new Set<number>();
  public likedTenisSubject: BehaviorSubject<Set<number>> = new BehaviorSubject<Set<number>>(this.likedTenis);
  public NewsReadSubject: BehaviorSubject<Set<number>> = new BehaviorSubject<Set<number>>(this.newsRead);

  getLikedTenisFromServer(userName: string): Observable<Set<number>> {
    return this.http.get<Set<number>>(`http://localhost:8080/api/tenis/likes/${userName}`);
  }


  getReadNewsFromServer(userName: string): Observable<Set<number>> {
    return this.http.get<Set<number>>(`http://localhost:8080/api/news/likes/${userName}`);
  }

  getLikedTenis(): Observable<Set<number>> {
    return this.likedTenisSubject.asObservable();
  }
  

  likeTenis(userName: string, tenisId: number): Observable<any> {
    this.likedTenis.add(tenisId);
    this.likedTenisSubject.next(this.likedTenis);
    const body = {
      userName: userName,
      tenisId: tenisId
    };
    return this.http.post(`http://localhost:8080/api/tenis/like/${tenisId}`, body);
  }

  readNews(userName: string, newsId: number): Observable<any> {
    this.newsRead.add(newsId);
    this.NewsReadSubject.next(this.newsRead);
    const body = {
      userName: userName,
      newsId: newsId
    };
    return this.http.post(`http://localhost:8080/api/news/like/${newsId}`, body);
  }
}
