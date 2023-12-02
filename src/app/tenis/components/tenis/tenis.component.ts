import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tenis } from '../../interfaces/tenis.interface';
import { TenisService } from '../../services/tenis.service';
import { UserService } from 'src/app/user.service';
import { AuthService } from 'src/app/auth.service';
import { LikeService } from 'src/app/like.service';

@Component({
  selector: 'app-tenis',
  templateUrl: './tenis.component.html',
  styleUrls: ['./tenis.component.css']
})
export class TenisComponent implements OnInit {
  @Input()
  public tenis: tenis = {
    id: 0,
    name: '',
    price: 0,
    image: '',
    liked: false
  };

  public hasUserLiked: boolean = false;

  constructor(
    private likeService: LikeService,
    public authService: AuthService,
    public userService: UserService,
    public tenisService: TenisService
  ) {
    
  }

  isAdmin: boolean = false;

  ngOnInit(): void {
    this.userService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    const userName = this.authService.getUserId();
    
  
    if (userName !== null) {
      this.likeService.getLikedTenisFromServer(userName).subscribe(
        (likedTenis: Set<number>) => {
          if (Array.isArray(likedTenis)) {
            // Convierte el array a un conjunto
            likedTenis = new Set(likedTenis);
          }
          
          console.log('Liked Tenis from Server:', likedTenis);
  
          // Asegúrate de que likedTenis sea un conjunto antes de usar has()
          if (likedTenis instanceof Set) {
            this.hasUserLiked = likedTenis.has(this.tenis.id);
  
            // Oculta el botón si el tenis.id está en likedTenis
            if (this.hasUserLiked) {
              // Puedes ajustar esto según cómo estés manejando la lógica en tu plantilla
              // Por ejemplo, podrías definir una propiedad adicional en tu modelo para manejar la visibilidad del botón
              // this.tenis.showLikeButton = false;
            }
          } else {
            console.error('Error: likedTenis is not a Set',likedTenis);
          }
        },
        (error) => {
          console.error('Error fetching liked tenis from server:', error);
        }
      );
    }
  }
  
  
  

  onDeleteclick() {
    this.tenisService.deleteTenis(this.tenis).subscribe((data: any) => {
      // Considera manejar la eliminación dentro del Angular sin recargar la página
      this.tenisService.tenis = data.characterList;
      window.location.reload();
      // Puedes emitir un evento o hacer lo que necesites aquí sin recargar la página
    });
  }

  onMarkLikeClick() {
    const tenisId = this.tenis.id;
    const userName = this.authService.getUserId();
    if (userName !== null) {
      this.likeService.likeTenis(userName, tenisId).subscribe(
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



/*
  hasUserLiked(): boolean {
    const userName = this.authService.getUserId();
    return userName !== null && !!this.tenis.likes?.includes(userName);
  }
  

  onMarkLikeClick() {
 const userName = this.authService.getUserId();
  const tenisId = this.tenis.id;

  if (userName !== null) {
    this.tenisService.likeTenis(userName, tenisId).subscribe(
      (data: any) => {
        // Actualiza la propiedad likes en tu modelo o realiza alguna lógica adicional
        this.tenis.likes = data.likes; // Asume que el servidor devuelve la lista actualizada de likes
        console.log('Like exitoso', data);
      },
      (error: any) => {
        console.error('Error al realizar el like', error);
      }
    );
  }
  }
  */
  
  


