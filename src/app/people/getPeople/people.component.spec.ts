import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../../app.component';
import { PeopleListComponent } from './people.component';

describe('AppComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          PeopleListComponent
        ],
      }).compileComponents();
    });

    // it('should render search', () => {
    //     let fixture = TestBed.createComponent(PeopleListComponent);
    //     fixture.detectChanges();
    //     fixture.whenStable().then(() => {
        
    //     const compiled = fixture.nativeElement as HTMLElement;

    //     let input = fixture.debugElement.query(compiled.querySelector('input'));
    //     let el = input.nativeElement;

    //     expect(el.value).toBe('peeskillet');

    //     el.value = 'someValue';
    //     el.dispatchEvent(new Event('input'));

    //     expect(fixture.componentInstance.user.username).toBe('someValue');
    // })});
});
