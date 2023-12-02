import { Component } from '@angular/core';
import { tenis } from '../../interfaces/tenis.interface';
import { TenisService } from '../../services/tenis.service';


@Component({
  selector: 'app-create-tenis',
  templateUrl: './create-tenis.component.html',
  styleUrls: ['./create-tenis.component.css']
})
export class CreateTenisComponent {

  
  public searchTerm:string ="";
  public idNum: number = 25;
  selectedTenisId: number | null = null;
  
  constructor(private tenisService: TenisService){
    this.searchtenis();
  }

  public get tenis(): tenis[]{
    return this.tenisService.tenis;
  }

  public searchByTerm(): void {
    this.searchtenis(this.searchTerm);
  }

  public newTenis: tenis={
    "id": this.idNum,
    "name": "",
    "price": 0,
    "image":"",
    "liked":false,
  };

  public createTenis() {
    console.log(this.newTenis);
    this.idNum++;

    this.tenisService.createTenis(this.newTenis).subscribe({
      next: (response: any) => {
        console.log(response);
  
        // Asigna el ID después de la operación de creación
        this.newTenis = {
          "id": this.idNum,
          "name": "",
          "price": 0,
          "image": "",
          "liked": false,
        };
      },
      error: (error: any) => {
        console.log(error);
        alert('Por favor, completa todos los campos.');
      },
    });
  }
  
  
  
  private searchtenis(searchTerm : string = ""): void{
    this.tenisService.fetchTenisFromApi(searchTerm).subscribe(
      {
        next: (response : any)=>{
          this.tenisService.tenis = response.tenisList;
        },
        error: (error: any)=>{
          console.log(error);
        }
        
      }

    )
  }

}
