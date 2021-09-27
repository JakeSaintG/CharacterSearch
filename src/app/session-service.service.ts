import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IPeople } from './people/getPeople/people';

@Injectable({
  providedIn: 'root'
})

export class SessionService 
// implements OnInit 
{
  person!:IPeople;  
  constructor() { }

  // ngOnInit():void {

  // }

  setData(person: IPeople){
    this.person = person;
    localStorage.setItem('personData', JSON.stringify(person))
  }
  getData() {
    return this.person;
  }
}

