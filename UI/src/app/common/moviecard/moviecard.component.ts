import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SaveBookingMovieDetails } from 'src/app/reduxFlow/actions/movie.action';
import { MovieDetailsResType } from 'src/app/reduxFlow/models/movie.model';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.css']
})
export class MoviecardComponent implements OnInit {

  constructor(private router: Router, private store: Store) { }

  @Input() movieDetails: MovieDetailsResType = {
    _id: "",
    castDetails: [],
    createdAt: "",
    movieGenre: [],
    movieName: "",
    plot: "",
    ratings: "",
    runTime: "",
    releaseDate: "",
    lastShowDate: "",
    posterName: ""
  };

  styleCard = {
    "padding": "10px"
  }

  genreList: String[] = [];

  castList: String[] = [];

  ngOnInit(): void {

    if (this.movieDetails) {
      this.genreList = this.movieDetails.movieGenre;
      this.castList = this.movieDetails.castDetails;
    }
  }

  getCastInitial(cast: String): string {
    if (cast) {
      return cast.split(" ")[0].charAt(0).toUpperCase() + cast.split(" ")[1].charAt(0).toUpperCase();
    } else {
      return "CC";
    }
    return cast.charAt(0);
  }

  getReleseYear(releaseDate: String): string {
    return new Date(releaseDate.toString()).getFullYear().toString();
  }

  routeToTheatre(movieId: String): void {
    const { movieName, releaseDate } = this.movieDetails;
    this.router.navigate([`/theatre/${movieId}`])
  }

  getImageSrc(posterName: string): string {
    if (posterName) {
      return `../../../assets/images/${posterName}.jpeg`
    }
    return "";
  }

}
