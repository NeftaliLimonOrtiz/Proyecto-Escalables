import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenisListComponent } from './components/tenis-list/tenis-list.component';
import { TenisComponent } from './components/tenis/tenis.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { tenisPage } from './tenis.page';
import { CreateTenisComponent } from './components/create-tenis/create-tenis.component';
import { UpdateTenisComponent } from './components/update-tenis/update-tenis.component';



@NgModule({
  declarations: [
    TenisListComponent,
    TenisComponent,
    tenisPage,
    CreateTenisComponent,
    UpdateTenisComponent
  ],

  exports:[
    TenisListComponent,
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class TenisModule { }
