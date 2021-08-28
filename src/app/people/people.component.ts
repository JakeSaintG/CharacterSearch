import { Component } from "@angular/core";

@Component({
    selector: `ps-people`,
    templateUrl: `./people.component.html`
})

export class PeopleListComponent {
    pageTitle: string = `People List`;
    people: any[] = [
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
            image: "ByteArray"
        }
    ]
}