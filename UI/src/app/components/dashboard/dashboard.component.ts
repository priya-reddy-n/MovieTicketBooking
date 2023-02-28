import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { MovieDetailsFetch } from 'src/app/reduxFlow/actions/movie.action';
import { movieSelector } from 'src/app/reduxFlow/selectors/movie.selectors';
import { LocationsType, MovieDetailsResType } from 'src/app/reduxFlow/models/movie.model';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(private router: Router, private store: Store, private dashboardService: DashboardService, private i18n: NzI18nService) {
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    if (!userName || !userId) {
      this.router.navigate(["/login"])
    }
  }

  movieDetails: MovieDetailsResType[] = [];
  locationsList: LocationsType[] = [];
  defaultLocation: string = "all";

  async ngOnInit(): Promise<void> {
    this.i18n.setLocale(en_US);
    const locationsData = await this.dashboardService.fetchLocationsList();

    if (locationsData) {
      this.locationsList = [...this.locationsList, { label: "All Locations", value: "all" }]
      locationsData.map((rec: string) => {
        this.locationsList = [...this.locationsList, { label: rec, value: rec }]
      })
    }

    console.log(this.locationsList)

    this.store.dispatch(MovieDetailsFetch());

    this.store.select(movieSelector).subscribe((moviesList: MovieDetailsResType[]) => {
      if (moviesList) {
        this.movieDetails = moviesList
      }
    });

  }

  async handleLocationChange(selectedLocation: string): Promise<void> {
    if (selectedLocation) {
      const moviesData = await this.dashboardService.fetchMovieBasedOnLocation(selectedLocation);
      if (moviesData && moviesData.length > 0) {
        this.movieDetails = moviesData;
      }
    }
  }
}
