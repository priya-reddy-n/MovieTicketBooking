interface MovieDetailsResType {
    _id: String;
    movieName: String;
    castDetails: String[];
    createdAt: String;
    movieGenre: String[];
    plot: String;
    ratings: String;
    runTime: String;
    releaseDate: string;
    lastShowDate: string;
    posterName: string;
}
interface TheatreDetailsResType {
    _id: string;
    theatreName: string;
    screenCount: string;
    screenId: String;
    screenName: string;
    movieId: String;
    tickets: string;
    ticketAmount: Number;
    isCancellationAvailable: String;
    location: string;
    createdAt: String;
    updatedAt: String;
}

interface BookingMovieDetails {
    movieName: string;
    releaseDate: string;
    movieDate: string;
    theatreName: string;
    screenName: string;
    ticketCount: number;
    totalPrice: string;
    paymentMode: string;
    location: string;
    movieTime: string;
    ticketID: string;
    screenId: number;
    isCancellationAvailable: boolean;
    movieId: string;
    theatreId: string;
    posterName: string;
}

interface SaveDBBookingDetailsTypes {
    userId: Object;
    theatreName: String;
    theatreLocation: String;
    screenName: String;
    rowNumber: String;
    seatList: String;
    ticketID: String;
    paymentMode: String;
    screenId: Number;
    ticketsCount: Number;
    totalAmount: String;
    movieName: String;
    isCancellationAvailable: Boolean;
    movieDate: string;
    movieTime: String;
    movieId: string;
    theatreId: string;
    posterName: string;
}

interface LocationsType {
    value: string,
    label: string
}


interface TimingsModel {
    theatreId: string;
    movieId: string;
    movieDate: Date;
    movieTiming: string;
    ticketCount: Number;
}

export {
    MovieDetailsResType,
    TheatreDetailsResType,
    BookingMovieDetails,
    SaveDBBookingDetailsTypes,
    LocationsType,
    TimingsModel
}