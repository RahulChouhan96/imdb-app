import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditMovieComponent } from './create-edit-movie/create-edit-movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [
  { path: "", component: MovieListComponent },
  { path: "create", component: CreateEditMovieComponent },
  { path: "edit", component: CreateEditMovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }