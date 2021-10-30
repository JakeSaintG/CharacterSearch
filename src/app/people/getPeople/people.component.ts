import { Component, OnInit } from "@angular/core";
import { ICharacters } from "./people";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError} from "rxjs/operators";
import { SessionService } from "src/app/session-service.service";

@Component({
    selector: `ps-people`,
    templateUrl: `./people.component.html`,
    styleUrls: ['./people.component.css']
})

export class PeopleListComponent implements OnInit {
    pageTitle: string = `People List`;
    imageWidth: number =  60;
    listFilter: string = '';
    characters: ICharacters[] = [];
    errorMessage: string = '';
    input: string = '';
    loadingProgress: string = ''; 
    today: Date = new Date();
    postUserAges:number[] = [];
    private characterAPIUrl: string = 'http://localhost:5000/people/';

    constructor(private http: HttpClient, private sessionService:SessionService) {}

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

    //Displays or hides intro message
    private _displayIntroMessage: boolean = true;
    get displayIntroMessage(): boolean {
        return this._displayIntroMessage;
    };
    set displayIntroMessage(value: boolean){
        this._displayIntroMessage = value;
    }

    ngOnInit(): void {     
        this.displayIntroMessage = true;
    };

    //set ages based on date string.
    getAge = (birthday: string) => {
        var today = this.today;
        var birthDate = new Date(birthday);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }       
        return age;
    }

    //Sets slider value to seconds and sets the animation length
    changeDelay(e: any) {
        var delayInSeconds: number = e.target.value * 1000;
        var loadingAnimation = `animation: progress-bar ${e.target.value}s ease-in-out;`;
        this.loadingProgress = loadingAnimation;
        this.delay = delayInSeconds;
    }
    
    displayLoading = () => {
        this.hideLoad = !this.hideLoad;    
    };

    fetchAll = () => {
        this.input = "";
        this.fetchWithDelay();
    }
    fetchSpecified = () => {
        if (this.input === '') {
            this.displaySearchReq = true;
            return;
        } else {
            this.displaySearchReq = false;
        }
        this.fetchWithDelay();
    }

    displaySearchReq: boolean = false;
    //Calls fetchCharacter() after being delayed.
    fetchWithDelay = () =>{       
        this.displayIntroMessage = false;
        this.displayLoading();
        this.characters = [];
        setTimeout(this.fetchCharacter, this.delay)    
    }

    //Connects to PeopleAPI to get requested information.
    fetchCharacter = () => {   
        console.log(`Delayed by: ${this.delay} milliseconds`);
        let fullUrl = this.characterAPIUrl + this.input;
        let getCharacter = this.http.get<ICharacters[]>(fullUrl).pipe(
            // tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)  
        );
        getCharacter.subscribe({
            next: characters => {this.characters = characters},
            complete: this.displayLoading, 
            error: err => {this.errorMessage = err, this.displayLoading()}
        });
    };

    setServiceData(charcter:ICharacters){
        this.sessionService.setData(charcter)
    }

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