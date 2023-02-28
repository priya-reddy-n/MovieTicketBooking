import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHistoryCardComponent } from './booking-history-card.component';

describe('BookingHistoryCardComponent', () => {
  let component: BookingHistoryCardComponent;
  let fixture: ComponentFixture<BookingHistoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingHistoryCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
