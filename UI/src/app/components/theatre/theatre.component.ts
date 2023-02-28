import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FetchSelectedMovieDetails, HandlePaymentModal, SaveBookingMovieDetails, TheatreDetailsFetch } from 'src/app/reduxFlow/actions/movie.action';
import { TheatreDetailsResType, BookingMovieDetails, MovieDetailsResType, TimingsModel } from 'src/app/reduxFlow/models/movie.model';
import { bookingMovieTheatreSelector, paymentModalSelector, selectedMovieSelector, theatreSelector } from 'src/app/reduxFlow/selectors/movie.selectors';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { faMasksTheater, faClone, faCircleNodes, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {

  movieId: string = "";
  theatreDetails: TheatreDetailsResType[] = [];
  selectedTheatreDetails: TheatreDetailsResType = {
    _id: "",
    createdAt: "",
    isCancellationAvailable: "",
    location: "",
    movieId: "",
    screenCount: "",
    screenId: "",
    screenName: "",
    theatreName: "",
    ticketAmount: 0,
    tickets: "",
    updatedAt: ""
  };
  selectedTheatreName: string = "";
  selectedTiming: string = "";
  availableTickets: string = "";
  timingKeys: any[] = [];
  ticketsCount: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  selectedTicketCount: string = "";
  selectedTicketPrice: string = "";
  multipliedPrice: string = "";
  additionalPrice: string = "4.30";
  isEnglish = false;
  paymentCardType: any = 'debit'
  expirationDate: any = '';
  isPaymentConfirmed: boolean = false;
  theatreName: string = '';
  screenName: string = '';
  ticketCount: number = 1;
  totalPrice: string = "";
  paymentMode: string = "UPI";
  location: string = "";
  selectedMovieTime: string = "";
  screenId: number = 1;
  isCancellationAvailable: boolean = false;

  releaseStartDate: string = "";
  showEndDate: string = "";

  isPastLastDate: boolean = false;

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

  movieDate: any = new Date;

  // icons
  faMasksTheater = faMasksTheater;
  faClone = faClone;
  faCircleNodes = faCircleNodes;
  faLocationPin = faLocationPin;

  // timing details
  timingDetails: TimingsModel[] = [];
  theatreId: string = "";
  posterName: string = "";

  constructor(private activatedRoute: ActivatedRoute, private store: Store, private i18n: NzI18nService, private router: Router, private message: NzMessageService,
    private dashboardService: DashboardService) {
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    if (!userName || !userId) {
      this.router.navigate(["/login"])
    }
  }

  async ngOnInit(): Promise<void> {
    this.i18n.setLocale(en_US);
    this.movieId = this.activatedRoute.snapshot.paramMap.get("movieId") || "";
    this.store.dispatch(TheatreDetailsFetch({ movieId: this.movieId }));
    this.store.dispatch(FetchSelectedMovieDetails({ movieId: this.movieId }));

    this.store.select(theatreSelector).subscribe((theatersList: TheatreDetailsResType[]) => {
      if (theatersList && theatersList.length > 0) {
        this.theatreDetails = theatersList
        const { _id, theatreName, tickets, ticketAmount, screenId, isCancellationAvailable } = theatersList[0];
        this.theatreName = theatreName;
        this.isCancellationAvailable = isCancellationAvailable === "YES" ? true : false;
        this.screenId = Number(screenId);
        this.theatreId = _id;
        this.handleDataUpdate(_id, theatreName, tickets, ticketAmount)
      }
    });

    this.store.select(selectedMovieSelector).subscribe((data: MovieDetailsResType) => {
      if (data) {
        this.selectedMovieDetails = data;
        const { lastShowDate, posterName } = data;
        this.isPastLastDate = new Date().getTime() > new Date(lastShowDate).getTime() + 1000 * 60 * 60 * 24;
        this.posterName = posterName;
      }
    })

    this.store.select(paymentModalSelector).subscribe((isModalOpen: boolean) => {
      this.isPaymentConfirmed = isModalOpen;
    });

    this.store.select(bookingMovieTheatreSelector).subscribe((data: BookingMovieDetails) => {
      this.movieTheatreDetails = data;
    });

    const resData = await this.dashboardService.fetchMovieTimings(this.movieId, this.theatreId, this.movieDate);
    if (resData) {
      this.timingDetails = resData;
      const timings = resData.map((rec: any) => rec.movieTiming);
      const countsList = resData.map((rec: any) => rec.ticketCount);
      this.availableTickets = countsList[0];
      this.selectedTiming = timings[0];
      console.log(timings)
      this.timingKeys = timings;
    }
  }

  async onMovieDateChange(result: Date): Promise<void> {
    this.store.dispatch(SaveBookingMovieDetails({ payload: { ...this.movieTheatreDetails, movieDate: result.toDateString() } }))
    let convDate = new Date(result).getTime();
    if (new Date(result).toDateString() === new Date(this.selectedMovieDetails.releaseDate).toDateString()) {
      convDate = new Date(result).getTime() + 1000 * 60 * 60 * 24;
    }
    const resData = await this.dashboardService.fetchMovieTimings(this.movieId, this.theatreId, new Date(convDate).toDateString());
    if (resData) {
      this.timingDetails = resData;
      const timings = resData.map((rec: any) => rec.movieTiming);
      const countsList = resData.map((rec: any) => rec.ticketCount);
      this.availableTickets = countsList[0];
      this.selectedTiming = timings[0];
      this.timingKeys = timings;
    }
  }

  checkIfCancellation(isCancel: any): string {
    return isCancel === "YES" ? "YES" : "No";
  }

  handleDataUpdate(_id: String, theatreName: string, tickets: string, ticketAmount: any): void {
    this.selectedTheatreName = theatreName;
    const timeObj = JSON.parse(tickets);
    if (timeObj && timeObj.length > 0) {
      const dKey = timeObj.map((rec: { time: String, count: Number }) => rec.time);
    }
    this.selectedTicketCount = String(1);
    this.selectedTheatreName = theatreName;
    if (_id) {
      this.handleTheatreClick(_id);
    }
    if (tickets) {
      let intialTickets = JSON.parse(tickets);
    }
    if (ticketAmount) {
      this.selectedTicketPrice = String(ticketAmount);
      const calcValue = (Number(ticketAmount) * Number(this.selectedTicketCount)).toFixed(2);
      this.multipliedPrice = String(calcValue);
      this.calculateTotalPrice();
    }
  }

  async handleTheatreClick(id: any): Promise<void> {
    try {
      let theatDetails = this.theatreDetails.filter(rec => rec._id === id);
      if (theatDetails && theatDetails.length > 0) {
        this.selectedTheatreDetails = theatDetails[0];
        const { tickets, theatreName, ticketAmount, _id, screenName, location } = theatDetails[0];
        this.theatreName = theatreName;
        this.screenName = screenName;
        this.location = location;
        this.movieDate = new Date();
        this.timingKeys = [];
        this.availableTickets = "";
        this.handleDataUpdate(_id, theatreName, tickets, ticketAmount)
      }
    } catch (e) { }
  }

  handleTimingChange(timing: string): void {
    this.selectedTiming = timing;
    if (this.timingDetails) {
      const filteredTimeCount = this.timingDetails.filter((rec: TimingsModel) => rec.movieTiming === timing);
      this.availableTickets = filteredTimeCount[0].ticketCount.toString();
      this.selectedMovieTime = filteredTimeCount[0].movieTiming;
    }
  }

  handleCountChange(item: string): void {
    this.selectedTicketCount = item;
    if (this.selectedTheatreDetails) {
      const { ticketAmount } = this.selectedTheatreDetails;
      this.selectedTicketPrice = String(ticketAmount);
      const calcValue = (Number(ticketAmount) * Number(this.selectedTicketCount)).toFixed(2);
      this.multipliedPrice = String(calcValue);
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice(): void {
    const total = (Number(this.multipliedPrice) + Number(this.additionalPrice)).toFixed(2);
    this.totalPrice = `$ ${String(total)}`
  }

  handlePaymenCardChange(event: any): void {
    this.paymentMode = `${event.toUpperCase()} CARD`;
  }

  handleTabChange(event: any): void {
    if (event && event.tab && event.tab.nzTitle) {
      if (event.tab.nzTitle !== "UPI") {
        this.paymentMode = `${this.paymentCardType.toUpperCase()} CARD`;
      } else {
        this.paymentMode = `UPI`;
      }
    }
  }

  handlePayment(): void {
    if (!this.movieDate) {
      this.message.error("Please select a Movie Date");
      return;
    }

    if (this.selectedMovieDetails) {
      const { releaseDate, lastShowDate } = this.selectedMovieDetails;
      if (this.movieDate >= new Date(releaseDate) && this.movieDate <= new Date(lastShowDate).getTime() + 1000 * 60 * 60 * 24) {
      } else {
        this.message.error("Please select a valid Movie Date");
        return;
      }
    }

    this.isPaymentConfirmed = true;
    this.store.dispatch(SaveBookingMovieDetails({ payload: { ...this.movieTheatreDetails, movieDate: this.movieDate, theatreName: this.theatreName, location: this.location, totalPrice: this.totalPrice, screenName: this.screenName, ticketCount: Number(this.selectedTicketCount), movieTime: this.selectedMovieTime, paymentMode: this.paymentMode, screenId: this.screenId, isCancellationAvailable: this.isCancellationAvailable, movieId: this.movieId, theatreId: this.theatreId, posterName: this.posterName } }))
    this.store.dispatch(HandlePaymentModal({ payload: true }));
  }

  getReleaseDate(releaseDate: string): any {
    if (releaseDate) {
      return new Date(releaseDate).toDateString();
    }
  }

  navigateToMovies(): void {
    this.router.navigate(["/dashboard"]);
  }

  getIcon(iconType: string): any {
    return `<nz-avatar nzIcon="user"></nz-avatar>`;
    // return `<i nz-icon nzType = "play-circle" nzTheme="outline"></i>`;
  }

}
