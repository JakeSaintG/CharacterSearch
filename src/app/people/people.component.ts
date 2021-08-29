import { Component, OnInit } from "@angular/core";
import { IPeople } from "./people";

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
    people: IPeople[] = [
        {
            id: 9,
            name: "tina turner",
            birthDate: "1939-11-26T00:00:00",
            address: {
                street: "Hollywood Boulevard, Vine St",
                city: "Los Angeles",
                state: "California",
                zip: 90028
            },
            interests: [
                "Mad Max",
                "The Sonny & Cher Show"
            ],
            image: "http://localhost:5000/PeopleImage/9.webp"
        }
    ];

    ngOnInit = (): void => {
        console.log('Nice!')
        //get data from my API
    }
}