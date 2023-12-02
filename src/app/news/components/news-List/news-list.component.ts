import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { news } from '../../interfaces/news.interface';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent {
  public searchTerm:string ="";
  public idNum: number = 4;
  selectedNewsId: number | null = null;

  constructor(private newsService: NewsService){
    this.searchnews();
  }

  public get news(): news[]{
    return this.newsService.news;
  }

  public searchByTerm(): void {
    this.searchnews(this.searchTerm);
  }

  public newNews: news={
    "id": this.idNum,
    "name": "",
    "image":"",
    "description":"",
    "read":false
  };

  public newNewsUpdate: news = {
    "id": this.idNum,
    "name": "",
    "image": "",
    "description":"",
    "read":false
  };

  public createNews(){
    console.log(this.newNews);
    this.idNum++;

    this.newsService.createNews(this.newNews).subscribe(
      {
        next:(response: any) => {
          console.log(response)

          this.newNews = {
            "id": this.idNum,
            "name": "",
            "image":"",
            "description":"",
            "read":false
          };
        },
        error:(error: any) => {
          console.log(error);
        }
      }
    )
  }

  public updateNews(): void {
    console.log(this.newNewsUpdate);
  
    this.newsService.updateNews(this.newNewsUpdate).subscribe({
      next: (response: any) => {
        console.log(response);

        this.newNewsUpdate = {
          "id": this.idNum,
          "name": "",
          "image":"",
          "description":"",
          "read": false
        };

        },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  private searchnews(searchTerm : string = ""): void{
    this.newsService.fetchNewsFromApi(searchTerm).subscribe(
      {
        next: (response : any)=>{
          this.newsService.news = response.newsList;
        },
        error: (error: any)=>{
          console.log(error);
        }
        
      }

    )
  }

  public loadNewsDetails(): void {
    if (this.selectedNewsId !== null) {
      this.newsService.getNewsDetails(this.selectedNewsId).subscribe(
        {
          next: (newsDetails: any) => {
            console.log('Cargar detalles:', newsDetails);

            this.newNewsUpdate.name =  newsDetails.name;
            this.newNewsUpdate.description = newsDetails.description;
            this.newNewsUpdate.image = newsDetails.image;
            this.newNewsUpdate.id =    newsDetails.id;
          },
          error: (error: any) => {
            console.error( error);
          }
        }
      );
    }
  }
}
