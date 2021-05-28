import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodaysTasksComponent } from './todays-tasks/todays-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    TodaysTasksComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
