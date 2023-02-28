import { FetchSelectedMovieDetails, FetchSelectedMovieDetailsSuccess, HandlePaymentModal, MovieDetailsFetch, MovieDetailsFetchFailure, MovieDetailsFetchSuccess, PaymentModalContent, SaveBookingMovieDetails, TheatreDetailsFetch, TheatreDetailsFetchSuccess } from "../actions/movie.action";
import { MovieState } from "../state/movie.state";
import { TYPES } from "../types";
import { createReducer, on } from '@ngrx/store';

const initialState: MovieState = {
    movieDetailsList: [],
    theatreDetailsList: [],
    isPaymentModalOpen: false,
    paymentModalContent: 'bookingconfirmation',
    bookingMovieDetails: {
        movieName: "", releaseDate: "", movieDate: "", theatreName: "", paymentMode: "", screenName: "", ticketCount: 1, totalPrice: "", location: "", movieTime: "", ticketID: "",
        screenId: 1, isCancellationAvailable: false, movieId: "", theatreId: "", posterName: ""
    },
    selectedMovieDetails: {
        _id: "",
        castDetails: [],
        createdAt: "",
        movieGenre: [],
        movieName: "",
        plot: "",
        ratings: "",
        releaseDate: "",
        runTime: "",
        lastShowDate: "",
        posterName: ""
    }
}

export const movieFeatureKey = 'movies';

export const reducer = createReducer(
    initialState,
    on(MovieDetailsFetch, (state, action) => { return { ...state } }),
    on(MovieDetailsFetchSuccess, (state, action) => {
        return { ...state, movieDetailsList: action.payload }
    }),
    on(TheatreDetailsFetch, (state, action) => { return { ...state, movieId: action.movieId } }),
    on(TheatreDetailsFetchSuccess, (state, action) => {
        return { ...state, theatreDetailsList: action.payload }
    }),
    on(HandlePaymentModal, (state, action) => { return { ...state, isPaymentModalOpen: action.payload } }),
    on(PaymentModalContent, (state, action) => { return { ...state, paymentModalContent: action.payload } }),
    on(SaveBookingMovieDetails, (state, action) => { return { ...state, bookingMovieDetails: action.payload } }),
    on(FetchSelectedMovieDetails, (state, action) => { return { ...state, movieId: action.movieId } }),
    on(FetchSelectedMovieDetailsSuccess, (state, action) => { return { ...state, selectedMovieDetails: action.payload } })
);