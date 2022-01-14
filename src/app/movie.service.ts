import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  // Get all movies
  getMovies(): Observable<any> {
    let url = "/movies";

    return this.http.get(url);
  }

  // Search names of producers/actors with keyword
  getProducerSuggestions(keyword: string, type: string): Observable<any> {
    let url = "/search/producers";

    let opts = { params: new HttpParams().set("keyword", keyword).set("type", type) };

    return this.http.get(url, opts);
  }

  // Create a new movie
  createMovie(movieObj: any) {
    let url = "/movie";

    return this.http.post(url, movieObj);
  }

  // Update a movie details
  editMovie(movieObj: any) {
    let url = "/movie";

    return this.http.patch(url, movieObj);
  }

  // Create a producer/actor
  createProducer(prodName: string, type: string) {
    let url = "/producer";

    return this.http.post(url, { fullName: prodName, type });
  }

  // Get a specific movie
  getMovie(movieId: string) {
    let url = "/movie/" + movieId;

    return this.http.get(url);
  }
}
