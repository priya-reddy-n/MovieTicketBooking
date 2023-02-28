import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from '../app/app-routing.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { BookinghistoryComponent } from './components/bookinghistory/bookinghistory.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzTagModule } from 'ng-zorro-antd/tag'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal'
import { NzStepsModule } from 'ng-zorro-antd/steps'
import { NzResultModule } from 'ng-zorro-antd/result'
import { NzDatePickerModule, NzDatePickerComponent } from 'ng-zorro-antd/date-picker'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { LoginRegisterService } from './service/login-register.service';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffect } from './reduxFlow/effects/movie.effects';
import { rootReducers } from './reduxFlow/reducers/rootReducer';
import { MoviecardComponent } from './common/moviecard/moviecard.component';
import { TheatreComponent } from './components/theatre/theatre.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookingHistoryCardComponent } from './common/booking-history-card/booking-history-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConfirmationComponent,
    BookinghistoryComponent,
    RegistrationComponent,
    LoginComponent,
    NavBarComponent,
    MoviecardComponent,
    TheatreComponent,
    BookingHistoryCardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzAvatarModule,
    NzTypographyModule,
    NzDatePickerModule,
    HttpClientModule,
    NzModalModule,
    NzStepsModule,
    NzIconModule,
    NzResultModule,
    NzSelectModule,
    NzListModule,
    NzTagModule,
    NzRadioModule,
    NzTabsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(rootReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([MovieEffect]),
    FontAwesomeModule
  ],
  providers: [LoginRegisterService, NzMessageService, NzModalService],
  bootstrap: [AppComponent],
  exports: [
    ReactiveFormsModule,
  ]
})
export class AppModule { }
