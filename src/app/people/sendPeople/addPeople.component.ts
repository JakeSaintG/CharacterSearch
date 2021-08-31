import { Component, Input } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError} from "rxjs/operators";
import { IPostUser, IUserAddress } from "./postUser";
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { PostImage } from "./addPeople.service";

@Component({
    selector: `ps-addPeople`,
    templateUrl: `./addPeople.component.html`,
    styleUrls: ['./addPeople.component.css']
})

export class AddPeopleComponent {    
    //Setting initial form data to allow the form to be reset.
    initUserId!:number;
    initUserName:string = '';
    initUserBirthdate:Date = new Date;
    initUserStreet:string = '';
    initUserCity:string = '';
    initUserState:string = '';
    initUserZip!:number;
    initUserInterests:string[] = [];
    initUserImage!:File;
    
    //Using NgModel to set the form data.
    postUserId:number = this.initUserId;
    postUserName:string = this.initUserName;
    postUserBirthdate:Date = this.initUserBirthdate;
    postUserStreet:string = this.initUserStreet;
    postUserCity:string = this.initUserCity;
    postUserState:string = this.initUserState;
    postUserZip:number = this.initUserZip;
    postUserInterests:string[] = this.initUserInterests;
    postUserImage:File = this.initUserImage;
    postUserAddress:IUserAddress = {street: this.postUserStreet,"city": this.postUserCity, "state": this.postUserState, "zip": this.postUserZip};
    people: IPostUser = {id: this.postUserId, name: this.postUserName, birthDate: this.postUserBirthdate, address: this.postUserAddress, "interests":this.postUserInterests}
    
    //For displaying "name is required"
    displayWarning: boolean = false;
    //For changing the text on the button to show or hide form.
    showOrHide: string = "Add User";
    //For displaying error message.
    errorMessage: string = '';

    //Getter and Setter for displaying user input
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

    constructor(private http: HttpClient, private fileUploadService: PostImage) {}

    //Generates a unique userID that will be used to connect the person to their image on the backend.
    generateUserId = () => {
        this.postUserId = Math.floor(100000000 + Math.random() * 900000000);
    }

    //Shows the form for submitting a new person.
    showForm = () => {
        this.displayForm = !this.displayForm;
        if (this.displayForm) {
            this.showOrHide = "Hide Form";
        } else {
            this.showOrHide = "Add User";
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
        this.postUserId = this.initUserId;
        this.postUserName = this.initUserName;
        this.postUserBirthdate = this.initUserBirthdate;
        this.postUserStreet = this.initUserStreet;
        this.postUserCity = this.initUserCity;
        this.postUserState = this.initUserState;
        this.postUserZip = this.initUserZip;
        this.postUserInterests = this.initUserInterests;
        this.postUserImage = this.initUserImage;
    }

    fileToUpload!: File | Blob;
    handleFileInput(event: any) {
        let file = event.target.files[0];
        console.log(file);

        this.fileToUpload = file;
        console.log(this.fileToUpload);
    }
    
    
    //Posts uploaded image to PeopleAPI
    postUserImg = () => { 
        console.log(this.fileToUpload)
        if (this.fileToUpload=== undefined) {
            return;
        } else {
            this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
                console.log("Image uploaded!");// do something, if upload success
            }, error => {
                console.log(error);
            });
        }
        
        /*========================================================================
        Not currently functional
        Must also rename image to the unique userID (this.postUserId) to be matched later.
        ========================================================================*/
    }
    

    //Posts entered Person to PeopleAPI
    postUser = () => {  
        if(!this.postUserName) {
            this.displayWarning = true;
            return
        };
        
        this.generateUserId();
        let fullUrl:string = "http://localhost:5000/people/";
        this.people.id = this.postUserId;
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
            error: err => {this.errorMessage = err}
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

    //Allows the user to fill in most fields automatically for easy testing.
    fillUser = () => {
        this.postUserName = "janis joplin";
        this.postUserBirthdate = new Date("1943-01-19");
        this.postUserStreet = "635 ashbury street";
        this.postUserCity = "san francisco";
        this.postUserState = "California";
        this.postUserZip = 94117;
        this.postUserInterests = ["painting"];
    } 
}