import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisableFutureOrPastDatesDirective } from './disable-future-or-past-dates.directive';

@NgModule({
  declarations: [
    AppComponent,
    DisableFutureOrPastDatesDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
