import { Component, OnInit } from "@angular/core";
import { IPeople } from "./people";
//import { DelayComponent } from "../delay/delay.component";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError} from "rxjs/operators";

@Component({
    selector: `ps-people`,
    templateUrl: `./people.component.html`,
    styleUrls: ['./people.component.css']
})

export class PeopleListComponent implements OnInit {
    pageTitle: string = `People List`;
    imageWidth: number =  50;
    imageMargin: number = 2;
    listFilter: string = '';
    people: IPeople[] = [];
    private _hideLoad: boolean = true;
    get hideLoad(): boolean {
        return this._hideLoad;
    };
    set hideLoad(value: boolean){
        this._hideLoad = value;
    }

    private _delay: number = 0;
    get delay(): number {
        return this._delay;
    };
    set delay(value: number){
        this._delay = value;
    }

    errorMessage = '';

    ngOnInit(): void {   
        this.fetchPeople().subscribe({
            next: people => this.people = people,
            error: err => this.errorMessage = err
        })
    };

    changeDelay(e: any) {
        var delayInSeconds: number = e.target.value * 1000;
        this.delay = delayInSeconds;
    }
    
    fetchWithDelay = () => {
        this.hideLoad = false;
        setTimeout(this.fetchPeople, this.delay);
        this.hideLoad = true;
    };

    private peopleAPIUrl: string = 'http://localhost:5000/people';

    constructor(private http: HttpClient) {}

    fetchPeople = (): Observable<IPeople[]> => {
        console.log(`Delayed by: ${this.delay} milliseconds`);
        
        return this.http.get<IPeople[]>(this.peopleAPIUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );   
    };

    private handleError(err: HttpErrorResponse){
        if (err.error instanceof ErrorEvent) {
            this.errorMessage = `An error occured: ${err.error.message}`;
        } else {
            this.errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
        }
        console.error(this.errorMessage);
        return throwError(this.errorMessage);
    }
}