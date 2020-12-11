import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { UserInterestsComponent } from './user-interests/user-interests.component';
import { UserInterestFormComponent } from './user-interests/user-interest-form/user-interest-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserdetailsComponent,
    UserInterestsComponent,
    UserInterestFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    LoginComponent
  ]
})
export class AppModule { }
