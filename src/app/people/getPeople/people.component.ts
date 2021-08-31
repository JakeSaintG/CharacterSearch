import { Component, OnInit } from "@angular/core";
import { IPeople } from "./people";
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
    errorMessage: string = '';
    input: string = '';
    loadingProgress: string = 'animation: progressBar 3s ease-in-out;';
    private peopleAPIUrl: string = 'http://localhost:5000/people/';
    constructor(private http: HttpClient) {}

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

    ngOnInit(): void {     
        this.fetchPeople()
        this.displayLoading()
    };

    changeDelay(e: any) {
        var delayInSeconds: number = e.target.value * 1000;

        var foo = `animation: progressBar ${e.target.value}s ease-in-out;`;
        this.loadingProgress = foo;
        this.delay = delayInSeconds;
    }
    
    displayLoading = () => {
        this.hideLoad = !this.hideLoad;    
    };

    fetchWithDelay = () =>{ 
        this.displayLoading();
        this.people = [];
        setTimeout(this.fetchPeople, this.delay)    
    }

    fetchPeople = () => {   
        console.log(`Delayed by: ${this.delay} milliseconds`);
        let fullUrl = this.peopleAPIUrl + this.input;

        let getPeople = this.http.get<IPeople[]>(fullUrl).pipe(
            //tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)  
        );

        getPeople.subscribe({
            next: people => {this.people = people},
            complete: this.displayLoading,
            error: err => {this.errorMessage = err, this.displayLoading()}
        });
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