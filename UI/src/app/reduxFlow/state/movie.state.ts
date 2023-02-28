import { BookingMovieDetails, MovieDetailsResType, TheatreDetailsResType } from "../models/movie.model";

interface MovieState {
    movieDetailsList: MovieDetailsResType[],
    theatreDetailsList: TheatreDetailsResType[]
    isPaymentModalOpen: boolean,
    paymentModalContent: string,
    selectedMovieDetails: MovieDetailsResType,
    bookingMovieDetails: BookingMovieDetails
}

export {
    MovieState
}