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
    imageWidth: number =  60;
    listFilter: string = '';
    people: IPeople[] = [];
    errorMessage: string = '';
    input: string = '';
    loadingProgress: string = ''; 
    private peopleAPIUrl: string = 'http://localhost:5000/people/';
    constructor(private http: HttpClient) {}

    //Getter and setter for displaying or hiding the loading bar
    private _hideLoad: boolean = true;
    get hideLoad(): boolean {
        return this._hideLoad;
    };
    set hideLoad(value: boolean){
        this._hideLoad = value;
    }

    //Getter and setter for how much delay will be set
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

    //Sets slider value to seconds and sets the animation length
    changeDelay(e: any) {
        var delayInSeconds: number = e.target.value * 1000;
        var foo = `animation: progress-bar ${e.target.value}s ease-in-out;`;
        this.loadingProgress = foo;
        this.delay = delayInSeconds;
    }
    
    displayLoading = () => {
        this.hideLoad = !this.hideLoad;    
    };

    //Calls fetchPeople() after being delayed.
    fetchWithDelay = () =>{ 
        this.displayLoading();
        this.people = [];
        setTimeout(this.fetchPeople, this.delay)    
    }

    //Connects to PeopleAPI to get requested information.
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