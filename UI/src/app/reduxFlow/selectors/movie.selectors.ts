import { createFeatureSelector, createSelector } from '@ngrx/store';
import { movieFeatureKey } from '../reducers/movie.reducers';
import { MovieState } from '../state/movie.state';

export const getMovieState = createFeatureSelector<MovieState>(movieFeatureKey);

export const movieSelector = createSelector(
    getMovieState,
    (state: MovieState) => { return state.movieDetailsList }
);

export const getTheatreState = createFeatureSelector<MovieState>(movieFeatureKey);

export const theatreSelector = createSelector(
    getTheatreState,
    (state: MovieState) => { return state.theatreDetailsList }
);

export const getPaymentModalOpenState = createFeatureSelector<MovieState>(movieFeatureKey);

export const paymentModalSelector = createSelector(
    getPaymentModalOpenState,
    (state: MovieState) => { return state.isPaymentModalOpen }
)

export const getPaymentModalContent = createFeatureSelector<MovieState>(movieFeatureKey);

export const paymentModalContentSelector = createSelector(
    getPaymentModalContent,
    (state: MovieState) => { return state.paymentModalContent }
)

export const getSelectedMovieDetails = createFeatureSelector<MovieState>(movieFeatureKey);

export const selectedMovieSelector = createSelector(
    getSelectedMovieDetails,
    (state: MovieState) => { return state.selectedMovieDetails }
)


export const getBookingMovieDetails = createFeatureSelector<MovieState>(movieFeatureKey);

export const bookingMovieTheatreSelector = createSelector(
    getBookingMovieDetails,
    (state: MovieState) => { return state.bookingMovieDetails }
)