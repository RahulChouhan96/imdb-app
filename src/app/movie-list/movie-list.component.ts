import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Array<any>;

  constructor(private movieService: MovieService, private router: Router) { }

  // Get all movie details
  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => this.movies = movies);
  }

  // Navigate to create movie page
  createMovie() {
    this.router.navigate(["/create"]);
  }

  // Navigate to edit movie page
  editMovie(movieId: string) {
    this.router.navigate(["/edit"], { queryParams: { id: movieId } });
  }
}
