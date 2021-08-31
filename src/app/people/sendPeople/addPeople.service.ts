import { Observable } from "rxjs";
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from  '@angular/common/http';
import { throwError } from "rxjs/internal/observable/throwError";
import { map, catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PostImage {
    errorMessage: string = '';

    constructor(private http: HttpClient) {}

    headersConfig: HttpHeaders | {
        [header: string]: string | string[];
    } | undefined

    postFile(fileToUpload: File): Observable<boolean> {
        const endpoint = 'http://localhost:5000/PeopleImage/';
        const formData: FormData = new FormData();

        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return this.http
          .post(endpoint, formData, { headers: this.headersConfig })
            .pipe(map(() => {return true;}))
            .pipe(catchError(((e: any) => this.handleError(e))))    
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