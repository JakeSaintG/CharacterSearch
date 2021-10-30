import { TestBed } from '@angular/core/testing';
import { ICharacters } from './people';
import { PeopleListComponent } from './people.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PeopleListComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [
          PeopleListComponent
        ],
      }).compileComponents();
    });


    it(`should contain a list of people`, () => {
      const fixture = TestBed.createComponent(PeopleListComponent);
      const app = fixture.componentInstance;
      const SUT: ICharacters[] = [ ];
      expect(app.characters).toEqual(SUT); 
    });

    it(`should return an accurate age`, () => {
      const fixture = TestBed.createComponent(PeopleListComponent);
      const app = fixture.componentInstance;
      let date: Date = new Date()
      const expected:number = 0;
      let today = date.toString();
      expect(app.getAge(today)).toEqual(expected); 
    });

    it('should render table', () => {
      const app = TestBed.createComponent(PeopleListComponent);
      app.detectChanges();
      const compiled = app.nativeElement as HTMLElement;
      expect(compiled.querySelector('table')?.getElementsByTagName).toBeTruthy;
    });
});
