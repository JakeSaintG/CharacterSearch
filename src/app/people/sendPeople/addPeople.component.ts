import { Component } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError} from "rxjs/operators";
import { IPostUser, IUserAddress } from "./postUser";
import { PeopleListComponent } from "../getPeople/people.component";

@Component({
    selector: `ps-addPeople`,
    templateUrl: `./addPeople.component.html`,
    styleUrls: ['./addPeople.component.css']
})

export class AddPeopleComponent {
    //people: IPostUser = {"name":"janis joplin","birthDate":"1943-01-19T00:00:00","address":{"street":"635 ashbury street","city":"san francisco","state":"California","zip":94117},"interests":["painting","reading","poetry"]}
    
    initUserName:string = '';
    initUserBirthdate:Date = new Date;
    initUserStreet:string = '';
    initUserCity:string = '';
    initUserState:string = '';
    initUserZip!:number;
    initUserInterests:string[] = [];
    
    postUserName:string = this.initUserName;
    postUserBirthdate:Date = this.initUserBirthdate;
    postUserStreet:string = this.initUserStreet;
    postUserCity:string = this.initUserCity;
    postUserState:string = this.initUserState;
    postUserZip:number = this.initUserZip;
    postUserInterests:string[] = this.initUserInterests;

    postUserAddress:IUserAddress = {street: this.postUserStreet,"city": this.postUserCity, "state": this.postUserState, "zip": this.postUserZip};
    people: IPostUser = {name: this.postUserName, birthDate: this.postUserBirthdate, address: this.postUserAddress, "interests":this.postUserInterests}
    
    
    showOrHide: string = "Add User";
    errorMessage: string = '';
    private _displayForm: boolean = false;
    get displayForm(): boolean {
        return this._displayForm;
    };
    set displayForm(value: boolean){
        this._displayForm = value;
    }
    
    private _interestCount: number[] = [1];
    
    get interestCount(): number[] {
        return this._interestCount;
    };
    set interestCount(value: number[]){
        this._interestCount = value;
    }

    constructor(private http: HttpClient) {}
    
    showForm = () => {
        this.displayForm = !this.displayForm;
        if (this.displayForm) {
            this.showOrHide = "Hide Form";
        } else {
            this.showOrHide = "Add User";
        }
    }
    addInterest = () => {
        this.interestCount.push(1);
    }

    removeInterest = () => {       
        this.interestCount.pop();
    }



    // displayLoading = () => {
    //     this.hideLoad = !this.hideLoad;    
    // };

    // fetchWithDelay = () =>{ 
    //     PeopleListComponent.displayLoading();
    //     this.people = [];
    //     setTimeout(this.fetchPeople, this.delay)    
    // }

    setFieldsToinit = (): void => {
        this.postUserName = this.initUserName;
        this.postUserBirthdate = this.initUserBirthdate;
        this.postUserStreet = this.initUserStreet;
        this.postUserCity = this.initUserCity;
        this.postUserState = this.initUserState;
        this.postUserZip = this.initUserZip;
        this.postUserInterests = this.initUserInterests;
    }

    postUser = () => {   
        //console.log(`Delayed by: ${this.delay} milliseconds`);

        let fullUrl:string = "http://localhost:5000/people/";
        this.people.name = this.postUserName;
        this.people.birthDate = this.postUserBirthdate;
        this.postUserAddress.street = this.postUserStreet;
        this.postUserAddress.city = this.postUserCity;
        this.postUserAddress.state = this.postUserState;
        this.postUserAddress.zip = this.postUserZip;
        this.people.interests = this.postUserInterests;

        let postUser = this.http.post(fullUrl, this.people).pipe(
            //tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)  
        );

        postUser.subscribe({
            //next: people => {this.people = people},
            //complete: this.displayLoading,
            error: err => {this.errorMessage = err/*, this.displayLoading*/()}
        });

        this.setFieldsToinit();
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