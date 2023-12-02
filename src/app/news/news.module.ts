import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './components/news/news.component';
import { NewsListComponent } from './components/news-List/news-list.component';
import { newsPage } from './news.page';
import { CreateNewsComponent } from './components/create-news/create-news.component';
import { UpdateNewsComponent } from './components/update-news/update-news.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NewsComponent,
    NewsListComponent,
    newsPage,
    CreateNewsComponent,
    UpdateNewsComponent
  ],
  exports:[
    NewsListComponent,
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class NewsModule { }
