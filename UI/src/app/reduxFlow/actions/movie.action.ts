import { Action, createAction, props } from "@ngrx/store";
import { BookingMovieDetails, MovieDetailsResType, SaveDBBookingDetailsTypes, TheatreDetailsResType } from "../models/movie.model";
import { TYPES } from "../types";

const MovieDetailsFetch = createAction(
    TYPES.FETCH_MOVIE_DETAILS
)

const MovieDetailsFetchSuccess = createAction(
    TYPES.FETCH_MOVIE_DETAILS_SUCCESS,
    props<{ payload: MovieDetailsResType[] }>()
)

const MovieDetailsFetchFailure = createAction(
    TYPES.FETCH_MOVIE_DETAILS_FAILURE,
    props<{ error: any }>()
)

const TheatreDetailsFetch = createAction(
    TYPES.FETCH_THEATRE_DETAILS,
    props<{ movieId: string }>()
)

const TheatreDetailsFetchSuccess = createAction(
    TYPES.FETCH_THEATRE_DETAILS_SUCCESS,
    props<{ payload: TheatreDetailsResType[] }>()
)

const TheatreDetailsFetchFailure = createAction(
    TYPES.FETCH_THEATRE_DETAILS_FAILURE,
    props<{ error: any }>()
)

const HandlePaymentModal = createAction(
    TYPES.PAYMENT_MODAL_HANDLE,
    props<{ payload: boolean }>()
)

const PaymentModalContent = createAction(
    TYPES.PAYMENT_MODAL_CONTENT,
    props<{ payload: string }>()
)

const SaveBookingMovieDetails = createAction(
    TYPES.SAVE_BOOKING_MOVIE_DETAILS,
    props<{ payload: BookingMovieDetails }>()
)

const FetchSelectedMovieDetails = createAction(
    TYPES.FETCH_SELECTED_MOVIE_DETAILS,
    props<{ movieId: string }>()
)

const FetchSelectedMovieDetailsSuccess = createAction(
    TYPES.FETCH_SELECTED_MOVIE_DETAILS_SUCCESS,
    props<{ payload: MovieDetailsResType }>()
)

const FetchSelectedMovieDetailsFailure = createAction(
    TYPES.FETCH_SELECTED_MOVIE_DETAILS_FAILUREE,
    props<{ error: any }>()
)

export {
    MovieDetailsFetch,
    MovieDetailsFetchSuccess,
    MovieDetailsFetchFailure,
    TheatreDetailsFetch,
    TheatreDetailsFetchSuccess,
    TheatreDetailsFetchFailure,
    HandlePaymentModal,
    PaymentModalContent,
    SaveBookingMovieDetails,
    FetchSelectedMovieDetails,
    FetchSelectedMovieDetailsSuccess,
    FetchSelectedMovieDetailsFailure,
}
