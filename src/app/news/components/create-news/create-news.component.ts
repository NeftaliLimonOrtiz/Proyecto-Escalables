import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { news } from '../../interfaces/news.interface';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent {
  public searchTerm:string ="";
  public idNum: number = 10;
  selectedNewsId: number | null = null;
  
  constructor(private newsService: NewsService){
    this.searchNews();
  }

  public get news(): news[]{
    return this.newsService.news;
  }

  public searchByTerm(): void {
    this.searchNews(this.searchTerm);
  }

  public newNews: news={
    "id": this.idNum,
    "name": "",
    "description": "",
    "image":"",
    "read": false
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
            "description": "",
            "image":"",
            "read":false
          };
        },
        error:(error: any) => {
          console.log(error);
          alert('Por favor, completa todos los campos.');
        }
      }
    )
  }
  
  private searchNews(searchTerm : string = ""): void{
    this.newsService.fetchNewsFromApi(searchTerm).subscribe(
      {
        next: (response : any)=>{
          this.newsService.news = response.newList;
        },
        error: (error: any)=>{
          console.log(error);
        }
        
      }

    )
  }
}
