import { TestBed } from '@angular/core/testing';
import { ICharacter } from './character';
import { CharactersListComponent } from './characters.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CharactersListComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [
          CharactersListComponent
        ],
      }).compileComponents();
    });

    it(`should contain a list of characters`, () => {
      const fixture = TestBed.createComponent(CharactersListComponent);
      const app = fixture.componentInstance;
      const SUT: ICharacter[] = [ ];
      expect(app.characters).toEqual(SUT); 
    });

    it(`should return an accurate age`, () => {
      const fixture = TestBed.createComponent(CharactersListComponent);
      const app = fixture.componentInstance;
      let date: Date = new Date()
      const expected:number = 0;
      let today = date.toString();
      expect(app.getAge(today)).toEqual(expected); 
    });

    it('should render table', () => {
      const app = TestBed.createComponent(CharactersListComponent);
      app.detectChanges();
      const compiled = app.nativeElement as HTMLElement;
      expect(compiled.querySelector('table')?.getElementsByTagName).toBeTruthy;
    });
});
