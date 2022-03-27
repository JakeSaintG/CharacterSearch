import { Component, Input } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError} from "rxjs/operators";
import { IPostCharacter } from "./post-new-character";
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { PostImage } from "./post-new-character.service";

@Component({
    selector: `ps-addCharacters`,
    templateUrl: `./post-new-character.component.html`,
    styleUrls: ['./post-new-character.component.css']
})

export class PostNewCharacterComponent {    
    //Setting initial form data to allow the form to be reset.
    initialCharacterId!:number;
    initialCharacterName:string = '';
    initialCharacterBirthdate:Date = new Date;
    initialCharacterStreet:string = '';
    initialCharacterCity:string = '';
    initialCharacterState:string = '';
    initialCharacterZip!:number;
    initialCharacterInterests:string[] = [];
    initialCharacterImage!:File;
    
    //Using NgModel to set the form data.
    postCharacterId:number = this.initialCharacterId;
    postCharacterName:string = this.initialCharacterName;
    postCharacterBirthdate:Date = this.initialCharacterBirthdate;
    postCharacterStreet:string = this.initialCharacterStreet;
    postCharacterCity:string = this.initialCharacterCity;
    postCharacterState:string = this.initialCharacterState;
    postCharacterZip:number = this.initialCharacterZip;
    postCharacterInterests:string[] = this.initialCharacterInterests;
    postCharacterImage:File = this.initialCharacterImage;
    characterToPost: IPostCharacter = {id: this.postCharacterId, name: this.postCharacterName, birthDate: this.postCharacterBirthdate, address: {street: this.postCharacterStreet,"city": this.postCharacterCity, "state": this.postCharacterState, "zip": this.postCharacterZip}, "interests":this.postCharacterInterests}
    
    //For displaying "name is required"
    displayWarning: boolean = false;
    //For changing the text on the button to show or hide form.
    showOrHide: string = "Add Character";
    //For displaying error message.
    errorMessage: string = '';
    //For setting a character's age based on today's date.
    today: Date = new Date();
    //Stores the uploaded photo for sending to CharacterAPI
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

    //Generates a unique characterID that will be used to connect the character to their image on the backend.
    generateCharacterId = () => {
        let randomID = Math.floor(100000000 + Math.random() * 900000000);
        this.postCharacterId = randomID;
        return randomID;
    }

    //Shows the form for submitting a new character.
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
    setFieldsToInitialValue = (): void => {
        this.postCharacterId = this.initialCharacterId;
        this.postCharacterName = this.initialCharacterName;
        this.postCharacterBirthdate = this.initialCharacterBirthdate;
        this.postCharacterStreet = this.initialCharacterStreet;
        this.postCharacterCity = this.initialCharacterCity;
        this.postCharacterState = this.initialCharacterState;
        this.postCharacterZip = this.initialCharacterZip;
        this.postCharacterInterests = this.initialCharacterInterests;
        this.postCharacterInterests[0] = "";
        this.postCharacterImage = this.initialCharacterImage;
        this.fileToUpload = undefined;
    }

    //Gets the file from the input based on the event target.
    //Sets it to be stored until the user makes a submission
    handleFileInput(event: any) {
        this.fileToUpload = event.target.files[0];
    }
     
    //Posts uploaded/stored image to CharacterAPI.
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
    
    //Posts entered character information to CharacterAPI when the user submits it.
    postCharacter = () => {  
        if(!this.postCharacterName) {
            this.displayWarning = true;
            return
        };    
        let fullUrl:string = "http://localhost:5000/character/";
        if (this.fileToUpload === undefined) {
            this.characterToPost.id = this.generateCharacterId();
        } else {
            this.characterToPost.id = this.postCharacterId;
        }
        this.characterToPost.name = this.postCharacterName.toLowerCase();
        this.characterToPost.birthDate = this.postCharacterBirthdate;
        this.characterToPost.address.street = this.postCharacterStreet;
        this.characterToPost.address.city = this.postCharacterCity;
        this.characterToPost.address.state = this.postCharacterState;
        this.characterToPost.address.zip = this.postCharacterZip;
        this.characterToPost.interests = this.postCharacterInterests;

        let postCharacter = this.http.post(fullUrl, this.characterToPost).pipe(
            //tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)  
        );

        postCharacter.subscribe({
            complete: this.showSuccess,
            error: err => {this.errorMessage = err}
        });
        //Reset the fields on the form.
        this.setFieldsToInitialValue();
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