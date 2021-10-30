import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ICharacters } from './people/getPeople/people';

@Injectable({
  providedIn: 'root'
})

export class SessionService 
// implements OnInit 
{
  person!:ICharacters;  
  constructor() { }

  // ngOnInit():void {

  // }

  setData(person: ICharacters){
    this.person = person;
    localStorage.setItem('personData', JSON.stringify(person))
  }
  getData() {
    return this.person;
  }
}

