import { AfterViewInit, Component, ElementRef } from '@angular/core';
//ng new PeopleSearch --prefix ps

@Component({
  selector: 'ps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'rgb(253, 251, 241)';
  }
  
  title: string = 'PeopleSearch';
}
