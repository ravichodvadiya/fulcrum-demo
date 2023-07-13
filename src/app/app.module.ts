import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './primeng.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BookingModule } from './booking/booking.module';
import { CommonModule } from '@angular/common';
import { InterceptServiceService } from './services/intercept-service.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimengModule,
    HttpClientModule,
    AuthenticationModule,
    BookingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptServiceService,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
