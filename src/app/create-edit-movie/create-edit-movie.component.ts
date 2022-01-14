import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-create-edit-movie',
  templateUrl: './create-edit-movie.component.html',
  styleUrls: ['./create-edit-movie.component.css']
})
export class CreateEditMovieComponent implements OnInit {
  movie: any = {};
  suggProducers: Array<any>;
  suggActors: Array<any>;
  created: boolean = false;
  selProducer: any;

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // If edit page, get the movie id from URL query params
    this.route.queryParams.subscribe(params => {

      // Get movie details
      if (params["id"])
        this.movieService.getMovie(params["id"]).subscribe((movie: any) => {
          this.movie = movie;
          this.selProducer = movie.producer;
          this.movie.producer = movie.producer.fullName;
        });
    });
  }

  // Get suggestions for producer/actor names
  getProducerNames(e: any, type: string) {
    this.movieService.getProducerSuggestions(e.target.value, type).subscribe(suggestions => {
      if (type == "producer")
        this.suggProducers = suggestions;
      else
        this.suggActors = suggestions;
    });
  }

  // Create/edit movie
  saveMovie() {

    // Attach producer & actor ids instead of their fullNames
    this.movie.producer = this.selProducer._id;
    this.movie.actors = this.movie.actors.map((actor: any) => actor._id);

    if (this.movie._id)
      this.movieService.editMovie(this.movie).subscribe(res => this.created = true);
    else
      this.movieService.createMovie(this.movie).subscribe(res => this.created = true);
  }

  // Update movie producer with selected producer name
  setProducer(producer: any) {
    this.movie.producer = producer.fullName;
    this.selProducer = producer;
  }

  // Create movie producer/actor
  createMovieProducer(type: string) {
    this.movieService.createProducer(this.movie.producer, type).subscribe((obj: any) => this.selProducer = obj);
  }

  // Add actor to the list
  setActor(actor: any) {
    if (!this.movie.actors || !this.movie.actors[0])
      this.movie.actors = [];
    this.movie.actors.push(actor);
  }
}
