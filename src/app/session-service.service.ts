import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ICharacter } from './characters/get-characters/character';

@Injectable({
  providedIn: 'root'
})

export class SessionService 
// implements OnInit 
{
  character!:ICharacter;  
  constructor() { }

  // ngOnInit():void {

  // }

  setData(character: ICharacter){
    this.character = character;
    localStorage.setItem('characterData', JSON.stringify(character))
  }
  getData() {
    return this.character;
  }
}

