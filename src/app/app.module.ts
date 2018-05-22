import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { StarsComponent } from './stars/stars.component';
import { FormsModule } from '@angular/forms';
import { StarDetailComponent } from './star-detail/star-detail.component';
import { StarService } from './star.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StarSearchComponent } from './star-search/star-search.component';

@NgModule({
  declarations: [
    AppComponent,
    StarsComponent,
    StarDetailComponent,
    MessagesComponent,
    DashboardComponent,
    StarSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StarService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
