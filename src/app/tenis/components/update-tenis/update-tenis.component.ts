import { Component } from '@angular/core';
import { tenis } from '../../interfaces/tenis.interface';
import { TenisService } from '../../services/tenis.service';

@Component({
  selector: 'app-update-tenis',
  templateUrl: './update-tenis.component.html',
  styleUrls: ['./update-tenis.component.css']
})
export class UpdateTenisComponent {
  public idNum: number = 4;
  selectedTenisId: number | null = null;
  public searchTerm:string ="";

  constructor(private tenisService: TenisService){
    this.searchtenis();
  }

  public get tenis(): tenis[]{
    return this.tenisService.tenis;
  }

  public searchByTerm(): void {
    this.searchtenis(this.searchTerm);
  }

  
  public newTenisUpdate: tenis = {
    "id": this.idNum,
    "name": "",
    "price": 0,
    "image": "",
    "liked":false,
  };

  public newTenis: tenis={
    "id": this.idNum,
    "name": "",
    "price": 0,
    "image":"",
    "liked":false,
  };
  public loadTenisDetails(): void {
    if (this.selectedTenisId !== null) {
      this.tenisService.getTenisDetails(this.selectedTenisId).subscribe(
        {
          next: (TenisDetails: any) => {
            console.log('Cargar detalles:', TenisDetails);

            this.newTenisUpdate.name =  TenisDetails.name;
            this.newTenisUpdate.price = TenisDetails.price;
            this.newTenisUpdate.image = TenisDetails.image;
            this.newTenisUpdate.id =    TenisDetails.id;

          },
          error: (error: any) => {
            console.error( error);
          }
        }
      );
    }
  }
  public updateTenis(): void {
    console.log(this.newTenisUpdate);
  
    this.tenisService.updateTenis(this.newTenisUpdate).subscribe({
      next: (response: any) => {
        console.log(response);

        this.newTenisUpdate = {
          "id": this.idNum,
          "name": "",
          "price": 0,
          "image":"",
          "liked":false,
        };

        },
      error: (error: any) => {
        console.log(error);
        alert('Por favor, completa todos los campos.');

      }
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
