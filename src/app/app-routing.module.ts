import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { tenisPage } from './tenis/tenis.page';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateTenisComponent } from './tenis/components/create-tenis/create-tenis.component';
import { UpdateTenisComponent } from './tenis/components/update-tenis/update-tenis.component';
import { newsPage } from './news/news.page';
import { CreateNewsComponent } from './news/components/create-news/create-news.component';
import { UpdateNewsComponent } from './news/components/update-news/update-news.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'tenis', component: tenisPage},
  { path: 'createtenis', component: CreateTenisComponent, canActivate: [AdminGuard]},
  { path: 'news', component: newsPage},
  { path: 'createNews', component: CreateNewsComponent, canActivate: [AdminGuard]},
  { path: 'updatetenis', component: UpdateTenisComponent, canActivate: [AdminGuard]},
  { path: 'updateNews', component: UpdateNewsComponent, canActivate: [AdminGuard]},
  { path: '', redirectTo:"login", pathMatch:"full"},
  { path: "not-found", component: NotFoundComponent},
  { path: "login", component: LoginComponent},
  { path: "**", redirectTo: "not-found", pathMatch: "full"},
  
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
