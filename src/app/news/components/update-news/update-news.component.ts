import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { news } from '../../interfaces/news.interface';

@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.css']
})
export class UpdateNewsComponent {
  public idNum: number = 4;
  selectedNewsId: number | null = null;
  public searchTerm:string ="";

  constructor(private newsService: NewsService){
    this.searchNews();
  }

  public get news(): news[]{
    return this.newsService.news;
  }

  public searchByTerm(): void {
    this.searchNews(this.searchTerm);
  }

  
  public newNewsUpdate: news = {
    "id": this.idNum,
    "name": "",
    "image": "",
    "description": "",
    "read":false
  };

  public newNews: news={
    "id": this.idNum,
    "name": "",
    "image":"",    
    "description": "",
    "read":false
  };

  public loadNewsDetails(): void {
    if (this.selectedNewsId !== null) {
      this.newsService.getNewsDetails(this.selectedNewsId).subscribe(
        {
          next: (newsDetails: any) => {
            console.log('Cargar detalles:', newsDetails);
            this.newNewsUpdate.name = newsDetails.name;    
            this.newNewsUpdate.image = newsDetails.image;
            this.newNewsUpdate.description = newsDetails.description;
            this.newNewsUpdate.id =    newsDetails.id;

            console.log('Name:', newsDetails.name);
            console.log('Image:', newsDetails.image);
            console.log('Description:', newsDetails.description);
            console.log('ID:', newsDetails.id);
          },
          error: (error: any) => {
            console.error( error);
          }
        }
      );
    }
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
          "description": "",
          "read":false
          
        };

        },
      error: (error: any) => {
        console.log(error);
        alert('Por favor, completa todos los campos.');

      }
    });
  }

  private searchNews(searchTerm : string = ""): void{
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
}
