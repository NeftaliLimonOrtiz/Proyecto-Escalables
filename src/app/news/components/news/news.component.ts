import { Component, Input } from '@angular/core';
import { news } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';
import { UserService } from 'src/app/user.service';
import { AuthService } from 'src/app/auth.service';
import { LikeService } from 'src/app/like.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  public hasReadNew: boolean = false;

  constructor (    private likeService: LikeService,
    private newsService: NewsService,private userService: UserService, public authService: AuthService ){

  }

  @Input()
  public news : news = {
    id : 0,
    name: '',
    image:'',
    description :'',
    read: false
  }

  public newNews : news = {
    "id" : 0,
    "name": "",
    "image": "",
    "description": "",
    "read": false
  }

  isAdmin: boolean = false;

  ngOnInit(): void {
    this.userService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    const userName = this.authService.getUserId();
    
  
    if (userName !== null) {
      this.likeService.getReadNewsFromServer(userName).subscribe(
        (readNews: Set<number>) => {
          if (Array.isArray(readNews)) {
            // Convierte el array a un conjunto
            readNews = new Set(readNews);
          }
          
          console.log('News Tenis from Server:', readNews);
  
          // Asegúrate de que likedTenis sea un conjunto antes de usar has()
          if (readNews instanceof Set) {
            this.hasReadNew = readNews.has(this.news.id);
  
            // Oculta el botón si el tenis.id está en likedTenis
            if (this.hasReadNew) {
              // Puedes ajustar esto según cómo estés manejando la lógica en tu plantilla
              // Por ejemplo, podrías definir una propiedad adicional en tu modelo para manejar la visibilidad del botón
              // this.tenis.showLikeButton = false;
            }
          } else {
            console.error('Error: likedTenis is not a Set',readNews);
          }
        },
        (error) => {
          console.error('Error fetching liked tenis from server:', error);
        }
      );
    }
  }

  onDeleteclick(){
    this.newsService.deleteNews(this.news).subscribe((data: any) => {
      this.newsService.news = data.newList;
      window.location.reload();
    });
  }

  onMarkAsReadClick() {
    const newsId = this.news.id;
    const userName = this.authService.getUserId();
    if (userName !== null) {
      this.likeService.readNews(userName, newsId).subscribe(
        (data: any) => {
          console.log('Like exitoso', data);
          window.location.reload();
          // No necesitas retornar nada aquí, ya que la actualización se maneja en el servicio
        },
        (error: any) => {
          console.error('Error al realizar el like', error);
        }
      );
    }
  }
}
