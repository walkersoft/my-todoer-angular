import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { TodaysTasksComponent } from './todays-tasks/todays-tasks.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'tasks', component: TodaysTasksComponent},
  {path: 'lists', component: TodaysTasksComponent},
  {path: '**', redirectTo: 'tasks'}
];

@NgModule({
  declarations: [
    AppComponent,
    TodaysTasksComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
