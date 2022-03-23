import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/session-service.service';
import { ICharacter } from '../get-characters/character';

@Component({
  selector: 'ps-character-profile',
  templateUrl: './character-profile.component.html',
  styleUrls: ['./character-profile.component.css']
})
export class CharacterProfileComponent implements OnInit {
  character!: ICharacter;
  pageTitle: string = 'Profile for: '

  constructor(private route: ActivatedRoute, private router: Router, private sessionService:SessionService) { }

  ngOnInit(): void {
    this.character = this.sessionService.getData();
    if (this.character === undefined) {
      this.character = JSON.parse(localStorage.getItem('characterData') || "{}");
    }
    const name = String(this.route.snapshot.paramMap.get('name'))
    this.pageTitle += `${name}`;
  }

  onBack(): void {
    this.router.navigate(['/character'])
    localStorage.removeItem('characterData');
  }
}
