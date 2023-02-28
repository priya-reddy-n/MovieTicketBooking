import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) {
  }

  isDashboard: boolean = true;
  isBookingHistory: boolean = false;

  ngOnInit(): void {
    this.isDashboard = this.router.url.includes("dashboard");
    this.isBookingHistory = this.router.url.includes("history");
  }

  navigateToMovies(): void {
    this.router.navigate(["/dashboard"]);
  }

  navigateToBookingHistory(): void {
    this.router.navigate(["/booking/history"]);
  }

  checkIfDashboard(): boolean {
    return this.isDashboard;
  }

  checkIfHistory(): boolean {
    return this.isBookingHistory;
  }

  handleLogout(): void {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName")
    this.router.navigate(["/login"]);
  }

}
