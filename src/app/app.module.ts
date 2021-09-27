import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PeopleListComponent } from './people/getPeople/people.component';
import { AddPeopleComponent } from './people/sendPeople/addPeople.component';
import { PeopleProfileComponent } from './people/people-profile/people-profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    AddPeopleComponent,
    PeopleProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'people', component: PeopleListComponent},
      {path: 'people/:name', component: PeopleProfileComponent},
      {path: '', redirectTo: "people", pathMatch: 'full'},
      // {path: '**', component: PageNoneFoundComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
