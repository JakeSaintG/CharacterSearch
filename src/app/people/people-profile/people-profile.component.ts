import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/session-service.service';
import { ICharacters } from '../getPeople/people';

@Component({
  selector: 'ps-people-profile',
  templateUrl: './people-profile.component.html',
  styleUrls: ['./people-profile.component.css']
})
export class PeopleProfileComponent implements OnInit {
  character!: ICharacters;
  pageTitle: string = 'Profile for: '

  constructor(private route: ActivatedRoute, private router: Router, private sessionService:SessionService) { }

  ngOnInit(): void {
    this.character = this.sessionService.getData();
    if (this.character === undefined) {
      this.character = JSON.parse(localStorage.getItem('personData') || "{}");
    }
    const name = String(this.route.snapshot.paramMap.get('name'))
    this.pageTitle += `${name}`;
  }

  onBack(): void {
    this.router.navigate(['/people'])
    localStorage.removeItem('personData');
  }
}
