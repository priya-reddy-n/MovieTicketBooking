import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-booking-history-card',
  templateUrl: './booking-history-card.component.html',
  styleUrls: ['./booking-history-card.component.css']
})
export class BookingHistoryCardComponent implements OnInit {


  @Input() bookingDetails: any = {};

  bookingId: string = "";
  movieName: string = "";
  theatreName: string = "";
  location: string = "";
  movieDate: string = "";
  movieTime: string = "";
  screenName: string = "";
  rowNumber: string = "";
  ticketID: string = "";
  seatListString: string = "";
  totalPrice: string = "";
  paymentMode: string = "";
  ticketStatus: string = "";
  isCancellationAvailable: boolean = false;
  theatreId: string = "";
  movieId: string = "";
  ticketsCount: number = 1;
  posterName: string = "";

  constructor(private modal: NzModalService, private dashboardService: DashboardService, private i18n: NzI18nService, private message: NzMessageService) { }

  @Output("updateData") parentFun: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.i18n.setLocale(en_US);
    if (this.bookingDetails) {
      console.log('this.bookingDetails', this.bookingDetails)
      const { _id, bookingDate, theatreName, isCancellationAvailable, movieDate, movieName, paymentMode, rowNumber,
        screenName, seatList, theatreLocation, ticketID, ticketStatus, totalAmount, movieTime, theatreId, movieId, ticketsCount, posterName } = this.bookingDetails;

      this.bookingId = _id;
      this.movieName = movieName;
      this.theatreName = theatreName;
      this.location = theatreLocation;
      this.movieDate = new Date(movieDate).toDateString();
      this.rowNumber = rowNumber;
      this.seatListString = seatList;
      this.isCancellationAvailable = isCancellationAvailable;
      this.paymentMode = paymentMode;
      this.ticketID = ticketID;
      this.location = theatreLocation;
      this.totalPrice = totalAmount;
      this.screenName = screenName;
      this.movieTime = movieTime;
      this.ticketStatus = ticketStatus;
      this.theatreId = theatreId;
      this.movieId = movieId;
      this.ticketsCount = ticketsCount;
      this.posterName = posterName;
    }
  }

  async handleTicketCancellation(): Promise<void> {
    this.modal.confirm({
      nzTitle: 'Do you want to Cancel this Ticket?',
      nzContent: 'Once Canclled, the action cannot be undone !',
      nzOnOk: async () => await this.cancelTicket()
    });
  }


  async cancelTicket(): Promise<any> {
    try {
      const res = await this.dashboardService.cancelMovieTicket(this.bookingId, this.movieId, this.theatreId, this.movieDate, this.movieTime, this.ticketsCount);
      if (res) {
        this.parentFun.emit();
      }
    } catch (e) {
      this.message.error("Ticket Cancellation Failed");
    }
  }

  showCancellationButton(): Boolean {
    if (this.ticketStatus === 'Booked' && this.isCancellationAvailable) {
      return true;
    }
    return false;
  }

  getImageSrc(posterName: string): string {
    console.log(posterName)
    if (posterName) {
      return `../../../assets/images/${posterName}.jpeg`
    }
    return "";
  }
}
