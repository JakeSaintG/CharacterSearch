import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PeopleListComponent } from './people/getPeople/people.component';
import { AddPeopleComponent } from './people/sendPeople/addPeople.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    AddPeopleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
