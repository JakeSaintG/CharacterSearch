import { Component, Input } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError} from "rxjs/operators";
import { IPostCharacter, ICharacterAddress } from "./postUser";
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { PostImage } from "./addPeople.service";

@Component({
    selector: `ps-addCharacter`,
    templateUrl: `./addPeople.component.html`,
    styleUrls: ['./addPeople.component.css']
})

export class AddPeopleComponent {    
    //Setting initial form data to allow the form to be reset.
    initCharacterId!:number;
    initCharacterName:string = '';
    initCharacterBirthdate:Date = new Date;
    initCharacterStreet:string = '';
    initCharacterCity:string = '';
    initCharacterState:string = '';
    initCharacterZip!:number;
    initCharacterInterests:string[] = [];
    initCharacterImage!:File;
    
    //Using NgModel to set the form data.
    postCharacterId:number = this.initCharacterId;
    postCharacterName:string = this.initCharacterName;
    postCharacterBirthdate:Date = this.initCharacterBirthdate;
    postCharacterStreet:string = this.initCharacterStreet;
    postCharacterCity:string = this.initCharacterCity;
    postCharacterState:string = this.initCharacterState;
    postCharacterZip:number = this.initCharacterZip;
    postCharacterInterests:string[] = this.initCharacterInterests;
    postCharacterImage:File = this.initCharacterImage;
    // postCharacterAddress:ICharacterAddress = {street: this.postCharacterStreet,"city": this.postCharacterCity, "state": this.postCharacterState, "zip": this.postCharacterZip};
    people: IPostCharacter = {id: this.postCharacterId, name: this.postCharacterName, birthDate: this.postCharacterBirthdate, address: {street: this.postCharacterStreet,"city": this.postCharacterCity, "state": this.postCharacterState, "zip": this.postCharacterZip}, "interests":this.postCharacterInterests}
    
    //For displaying "name is required"
    displayWarning: boolean = false;
    //For changing the text on the button to show or hide form.
    showOrHide: string = "Add Character";
    //For displaying error message.
    errorMessage: string = '';
    //For setting a person's age based on today's date.
    today: Date = new Date();
    //Stores the uploaded photo for sending to PeopleAPI
    fileToUpload!: File | undefined;

    //Getter and Setter for displaying user input
    private _displayForm: boolean = false;
    get displayForm(): boolean {
        return this._displayForm;
    };
    set displayForm(value: boolean){
        this._displayForm = value;
    }
    
    //Getter and Setter for how many interest boxes will be displayed.
    private _interestCount: number[] = [1];   
    get interestCount(): number[] {
        return this._interestCount;
    };
    set interestCount(value: number[]){
        this._interestCount = value;
    }

    private _successfulSubmission: boolean = false;   
    get successfulSubmission(): boolean {
        return this._successfulSubmission;
    };
    set successfulSubmission(value: boolean){
        this._successfulSubmission = value;
    };

    constructor(private http: HttpClient, private fileUploadService: PostImage) {}

    //Generates a unique userID that will be used to connect the person to their image on the backend.
    generateCharacterId = () => {
         let randomID = Math.floor(100000000 + Math.random() * 900000000);
         this.postCharacterId = randomID;
         return randomID;
    }

    //Shows the form for submitting a new person.
    showForm = () => {
        this.displayForm = !this.displayForm;
        if (this.displayForm) {
            this.showOrHide = "Hide Form";
        } else {
            this.showOrHide = "Add Character";
        }
    }

    //Controls the amount of "interest" boxes on the page.
    addInterest = () => {
        this.interestCount.push(1);
    }
    removeInterest = () => {       
        this.interestCount.pop();
    }

    //resets the fields in the submission block
    setFieldsToinit = (): void => {
        this.postCharacterId = this.initCharacterId;
        this.postCharacterName = this.initCharacterName;
        this.postCharacterBirthdate = this.initCharacterBirthdate;
        this.postCharacterStreet = this.initCharacterStreet;
        this.postCharacterCity = this.initCharacterCity;
        this.postCharacterState = this.initCharacterState;
        this.postCharacterZip = this.initCharacterZip;
        this.postCharacterInterests = this.initCharacterInterests;
        this.postCharacterInterests[0] = "";
        this.postCharacterImage = this.initCharacterImage;
        this.fileToUpload = undefined;
    }

    //Gets the file from the input based on the event target.
    //Sets it to be stored until the user makes a submission
    handleFileInput(event: any) {
        this.fileToUpload = event.target.files[0];
    }
     
    //Posts uploaded/stored image to PeopleAPI.
    postCharacterImg = () => { 
        if (this.fileToUpload=== undefined) {
            return;
        } else {
            this.fileUploadService.postFile(this.fileToUpload, this.generateCharacterId()).subscribe(data => {
                console.log("Image uploaded!");//if upload success
            }, error => {
                console.log(error);
            });
        }
    }
    
    showSuccess = () => {
        this.successfulSubmission = !this.successfulSubmission;
        setTimeout(() => {
            this.successfulSubmission = !this.successfulSubmission;
        }, 5000);
    }
    
    //Posts entered Person information to PeopleAPI when the user submits it.
    postCharacter = () => {  
        if(!this.postCharacterName) {
            this.displayWarning = true;
            return
        };    
        let fullUrl:string = "http://localhost:5000/people/";
        if (this.fileToUpload === undefined) {
            this.people.id = this.generateCharacterId();
        } else {
            this.people.id = this.postCharacterId;
        }
        this.people.name = this.postCharacterName.toLowerCase();
        this.people.birthDate = this.postCharacterBirthdate;
        this.people.address.street = this.postCharacterStreet;
        this.people.address.city = this.postCharacterCity;
        this.people.address.state = this.postCharacterState;
        this.people.address.zip = this.postCharacterZip;
        this.people.interests = this.postCharacterInterests;

        let postCharacter = this.http.post(fullUrl, this.people).pipe(
            //tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)  
        );

        postCharacter.subscribe({
            complete: this.showSuccess,
            error: err => {this.errorMessage = err}
        });
        //Reset the fields on the form.
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

    //Allows the Character to fill in most fields automatically for easy testing.
    fillCharacter = () => {
        this.postCharacterName = "janis joplin";
        this.postCharacterBirthdate = new Date("1943-01-19");
        this.postCharacterStreet = "635 ashbury street";
        this.postCharacterCity = "san francisco";
        this.postCharacterState = "California";
        this.postCharacterZip = 94117;
        this.postCharacterInterests = ["painting"];
    } 
}