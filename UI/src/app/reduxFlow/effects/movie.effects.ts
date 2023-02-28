import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, mergeMap, switchMap } from "rxjs/operators";
import { DashboardService } from "src/app/service/dashboard.service";
import { FetchSelectedMovieDetailsFailure, FetchSelectedMovieDetailsSuccess, MovieDetailsFetch, MovieDetailsFetchFailure, MovieDetailsFetchSuccess, TheatreDetailsFetchFailure, TheatreDetailsFetchSuccess } from "../actions/movie.action";
import { TYPES } from "../types";


@Injectable()

export class MovieEffect {

    constructor(private actions$: Actions, private movieService: DashboardService) { }

    fetchMovieDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TYPES.FETCH_MOVIE_DETAILS),
            map((action: any) => action.payload),
            switchMap(() => {
                return this.movieService.fetchAllMovies()
                    .pipe(
                        map((response: any) =>
                            MovieDetailsFetchSuccess({ payload: response })
                        ),
                        catchError((error: any) => {
                            return of(MovieDetailsFetchFailure({ error }))
                        })
                    )
            }
            )
        )
    );

    fetchTheatreDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TYPES.FETCH_THEATRE_DETAILS),
            map((action: any) => action),
            switchMap((action: any) => {
                return this.movieService.fetchTheatreDetails(action.movieId)
                    .pipe(
                        map((response: any) =>
                            TheatreDetailsFetchSuccess({ payload: response })
                        ),
                        catchError((error: any) => {
                            return of(TheatreDetailsFetchFailure({ error }))
                        })
                    )
            }
            )
        )
    );

    fetchSelectedMovieDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TYPES.FETCH_SELECTED_MOVIE_DETAILS),
            map((action: any) => action),
            switchMap((action: any) => {
                return this.movieService.fetchSelectedMovieDetails(action.movieId)
                    .pipe(
                        map((response: any) =>
                            FetchSelectedMovieDetailsSuccess({ payload: response })
                        ),
                        catchError((error: any) => {
                            return of(FetchSelectedMovieDetailsFailure({ error }))
                        })
                    )
            }
            )
        )
    );
}