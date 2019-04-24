import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name:string = 'Jinwei';

  // methods
  constructor(){
    console.log(123)
    this.changeName("Jinwei Zhang")
  }

  changeName(name:string):void{
    this.name = name;
  }
}
