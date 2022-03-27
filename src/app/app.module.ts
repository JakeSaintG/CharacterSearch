import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CharactersListComponent } from './characters/get-characters/characters.component';
import { PostNewCharacterComponent } from './characters/post-new-character/post-new-character.component';
import { CharacterProfileComponent } from './characters/character-profile/character-profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CharactersListComponent,
    PostNewCharacterComponent,
    CharacterProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'character', component: CharactersListComponent},
      {path: 'character/:name', component: CharacterProfileComponent},
      {path: '', redirectTo: "character", pathMatch: 'full'},
      // {path: '**', component: PageNoneFoundComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
