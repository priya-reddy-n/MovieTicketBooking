import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import axios from "axios";
import { HttpClient } from "@angular/common/http";
import { SaveDBBookingDetailsTypes } from "../reduxFlow/models/movie.model";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) { }

    private backendServer = 'http://localhost:8000';
    private movieDetailsURL = `${this.backendServer}/fetch/all/movies`;
    private theaterDetailsURL = `${this.backendServer}/fetch/theatre/details`;
    private selectedMovieDetailsURL = `${this.backendServer}/fetch/movie/details`;
    private saveBookingDetailsURL = `${this.backendServer}/book/tickets`;
    private fetchLocationsURL = `${this.backendServer}/fetch/locations`;
    private fetchMovieOnLocationsURL = `${this.backendServer}/fetch/movie/location`;
    private fetchBookingHistoryURL = `${this.backendServer}/fetch/booking/history`;
    private cancelTicketURL = `${this.backendServer}/cancel/tickets`;
    private fetchTimingsURL = `${this.backendServer}/fetch/timings`;

    // Fetch all movie details
    fetchAllMovies(): Observable<any> {
        return this.http.get(this.movieDetailsURL);
    }

    fetchTheatreDetails(movieId: string): Observable<any> {
        return this.http.get(`${this.theaterDetailsURL}?movieId=${movieId}`);
    }

    fetchSelectedMovieDetails(movieId: string): Observable<any> {
        return this.http.get(`${this.selectedMovieDetailsURL}?movieId=${movieId}`);
    }

    async saveBookingDetailsService(payload: SaveDBBookingDetailsTypes): Promise<any> {
        const resData = await axios.post(this.saveBookingDetailsURL, payload).then(res => {
            if (res && res.data) {
                const { msg } = res.data;
                if (res.status === 200) {
                    return { msg, loggedIn: true };
                } else if (res.status === 400) {
                    return { msg, loggedIn: false };
                }
            }
            throw "Ticket Booking Failed";
        });
        return resData;
    }

    async fetchLocationsList(): Promise<any> {
        const resData = await axios.get(this.fetchLocationsURL).then(res => {
            if (res && res.data) {
                return res.data;
            }
            throw "Location fetching failed";
        });
        return resData;
    }

    async fetchMovieBasedOnLocation(loc: string): Promise<any> {
        const reqURL = `${this.fetchMovieOnLocationsURL}?location=${loc}`;
        const resData = await axios.get(reqURL).then(res => {
            if (res && res.data) {
                return res.data;
            }
            throw "Movie fetching failed";
        });
        return resData;
    }

    async fetchBookingHistory(userId: string): Promise<any> {
        const reqURL = `${this.fetchBookingHistoryURL}?userId=${userId}`;
        const resData = await axios.get(reqURL).then(res => {
            if (res && res.data) {
                return res.data;
            }
            throw "Booking History fetching failed";
        });
        return resData;
    }

    async cancelMovieTicket(bookingId: string, movieId: string, theatreId: string, movieDate: string, movieTime: string, ticketCount: number): Promise<any> {
        const reqURL = `${this.cancelTicketURL}`;
        const payload = { bookingId, movieId, theatreId, movieDate, movieTime, ticketCount }
        const resData = await axios.post(reqURL, payload).then(res => {
            if (res && res.data && res.status === 200) {
                return res.data;
            }
            throw "Booking cancelled failed";
        });
        return resData;
    }

    async fetchMovieTimings(movieId: string, theatreId: string, movieDate: string): Promise<any> {
        const payload = { movieId, theatreId, movieDate };
        const resData = await axios.post(this.fetchTimingsURL, payload).then(res => {
            if (res && res.data && res.status === 200) {
                return res.data;
            }
            throw "Booking cancelled failed";
        });
        return resData;
    }
}