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

    ngOnInit = (): void => {
        console.log('Nice!')
        //get data from my API
    };

    changeDelay(e: any) {
        var delayInSeconds: number = e.target.value * 1000;
        this.delay = delayInSeconds;
    }
    
    fetchWithDelay = () => {
        this.hideLoad = false;
        setTimeout(this.fetchPeople, this.delay);
        this.hideLoad = true;
    };

    fetchPeople = () => {
        console.log(`Delayed by: ${this.delay} milliseconds`);
    };
}