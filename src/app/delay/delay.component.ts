// import { Component } from "@angular/core";
// import { PeopleListComponent } from "../people/people.component";

// @Component({
//     selector: `ps-delay`,
//     template: `<input type="range" min="0" max="5" value="0" class="slider" id="delaySlider" (input)="changeDelay($event)">`,
//     styleUrls: ['./delay.component.css']
// })

// export class DelayComponent {
//     private _hideLoad: boolean = true;
//     get hideLoad(): boolean {
//         return this._hideLoad;
//     };
//     set hideLoad(value: boolean){
//         this._hideLoad = value;
//     }

//     private _delay: number = 0;
//     get delay(): number {
//         return this._delay;
//     };
//     set delay(value: number){
//         this._delay = value;
//     }

//     changeDelay(e: any) {
//         var delayInSeconds: number = e.target.value * 1000; 
//         this.delay = delayInSeconds;
//     }
    
//     fetchWithDelay = () => {
//         this.hideLoad = false;
//         setTimeout(PeopleListComponent.fetchPeople, this.delay);
//         this.hideLoad = true;
//     };
// }