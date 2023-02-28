import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HandlePaymentModal, PaymentModalContent, SaveBookingMovieDetails } from 'src/app/reduxFlow/actions/movie.action';
import { bookingMovieTheatreSelector, paymentModalContentSelector, paymentModalSelector, selectedMovieSelector } from 'src/app/reduxFlow/selectors/movie.selectors';
import { merge, Observable, timer } from 'rxjs';
import { delay, finalize, map, scan } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BookingMovieDetails, MovieDetailsResType, TheatreDetailsResType } from 'src/app/reduxFlow/models/movie.model';
import * as RandExp from 'randexp';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})

export class ConfirmationComponent implements OnInit {

  isVisibleMiddle: boolean = true;
  isBookingConfirmPage: boolean = true;
  currentStep: number = 0;
  percentage: number = 0;
  processing: boolean = false;
  isConfirmButtonDisabled: boolean = false;
  isCancelButtonVisible: boolean = true;
  isClosableButtonVisible: boolean = true;
  rowNumbers: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];
  maxSeatNumber: number = 12;

  selectedMovieDetails: MovieDetailsResType = {
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

  movieTheatreDetails: BookingMovieDetails = {
    movieDate: "",
    movieName: "",
    releaseDate: "",
    theatreName: "",
    paymentMode: "",
    screenName: "",
    ticketCount: 1,
    totalPrice: "",
    location: "",
    movieTime: "",
    ticketID: "",
    screenId: 1,
    isCancellationAvailable: false,
    movieId: "",
    theatreId: "",
    posterName: ""
  }

  theatreName: string = "";
  theatreLocation: string = "";
  movieDate: string = "";
  movieTime: string = "";
  screenName: string = "";
  totalPrice: string = "";
  rowNumber: string = "";
  seatListString: string = "";
  ticketID: string = "";
  paymentMode: string = "";
  movieId: string = "";
  theatreId: string = "";
  posterName: string = "";

  userId: string = "";

  constructor(private store: Store, private router: Router, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId") || "";
    this.isBookingConfirmPage = true;
    this.store.select(paymentModalContentSelector).subscribe((modalContent: string) => {
      this.isBookingConfirmPage = modalContent === 'bookingconfirmation' ? true : false;
    });


    this.store.select(selectedMovieSelector).subscribe((data: MovieDetailsResType) => {
      if (data) {
        this.selectedMovieDetails = data;
      }
    });

    this.store.select(bookingMovieTheatreSelector).subscribe((data: BookingMovieDetails) => {
      if (data) {
        console.log('data', data)
        this.movieTheatreDetails = data;
        const { movieDate, theatreName, location, screenName, movieTime, totalPrice, ticketCount, paymentMode, movieId, theatreId, posterName } = data;
        this.movieDate = new Date(movieDate).toDateString();
        this.theatreLocation = location;
        this.screenName = screenName;
        this.movieTime = movieTime;
        this.totalPrice = totalPrice;
        this.paymentMode = paymentMode;
        this.rowNumber = this.rowNumbers[(Math.random() * this.rowNumbers.length) | 0];
        this.theatreId = theatreId;
        this.movieId = movieId;
        this.posterName = posterName;

        const randomNumber = Math.floor(Math.random() * (12 - 1 + 1) + 1);
        const ticketCreatorArray = [];
        for (let i = 0; i < ticketCount; i++) {
          ticketCreatorArray.push(`${this.rowNumber}${randomNumber + i}`)
        }
        this.seatListString = ticketCreatorArray.join(", ");
        this.ticketID = new RandExp(/^([A-Z]){3}([A-Z0-9]){7}$/).gen();
      }
    });
  }


  handleCancel(): void {
    this.store.dispatch(HandlePaymentModal({ payload: false }));
  }

  mockAsyncStep(): Observable<number> {
    const subStep1 = timer(600).pipe(map(() => 25));
    const subStep2 = subStep1.pipe(delay(600));
    const subStep3 = subStep2.pipe(delay(600));
    const subStep4 = subStep3.pipe(delay(600));
    return merge(subStep1, subStep2, subStep3, subStep4).pipe(scan((a, b) => a + b));
  }

  handleConfirmBooking(): void {
    this.processing = true;
    this.isConfirmButtonDisabled = true;
    this.isCancelButtonVisible = false;
    this.isClosableButtonVisible = false;
    this.saveBookingDetails();
    this.mockAsyncStep()
      .pipe(
        finalize(() => {
          this.percentage = 0;
          this.processing = false;
          this.currentStep += 1;
        })
      )
      .subscribe(p => {
        this.percentage = p;
      });
  }

  getTemplateCode(): string {
    return this.isBookingConfirmPage ? "bookingconfirmation" : "afterbooking";
  }

  goToMovies(): void {
    this.store.dispatch(HandlePaymentModal({ payload: false }));
    this.router.navigate(["/dashboard"])
  }

  goToBookingHistory(): void {
    this.store.dispatch(HandlePaymentModal({ payload: false }));
    this.router.navigate(["/booking/history"])
  }

  async saveBookingDetails(): Promise<any> {
    try {
      const { ticketCount, theatreName, screenId, isCancellationAvailable } = this.movieTheatreDetails;
      await this.dashboardService.saveBookingDetailsService({
        movieDate: this.movieDate, movieName: this.selectedMovieDetails.movieName, movieTime: this.movieTime, paymentMode: this.paymentMode,
        rowNumber: this.rowNumber, screenId, screenName: this.screenName, seatList: this.seatListString, theatreLocation: this.theatreLocation, theatreName: theatreName,
        ticketID: this.ticketID, ticketsCount: Number(ticketCount), userId: this.userId, totalAmount: this.totalPrice, isCancellationAvailable, theatreId: this.theatreId, movieId: this.movieId,
        posterName: this.posterName
      })
    } catch (e) {

    }
  }

  getImageSrc(posterName: string): string {
    console.log(posterName)
    if (posterName) {
      return `../../../assets/images/${posterName}.jpeg`
    }
    return "";
  }
}
