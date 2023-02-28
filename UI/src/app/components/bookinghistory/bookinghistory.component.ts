import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})
export class BookinghistoryComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private router: Router) {
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    if (!userName || !userId) {
      this.router.navigate(["/login"])
    }
  }

  bookingHistory: any = [];

  async ngOnInit(): Promise<void> {

    const userId = localStorage.getItem("userId") || "";

    if (userId) {
      const resData = await this.dashboardService.fetchBookingHistory(userId);
      if (resData) {
        this.bookingHistory = resData;
      }
    }
  }

  public async updateData(): Promise<void> {
    const userId = localStorage.getItem("userId") || "";

    if (userId) {
      const resData = await this.dashboardService.fetchBookingHistory(userId);
      if (resData) {
        this.bookingHistory = resData;
      }
    }
  }

  navigateToMovies(): void {
    this.router.navigate(["/dashboard"]);
  }

}
