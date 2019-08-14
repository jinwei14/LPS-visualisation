// this parser file is the parser for te animated cloud.
function Roundabout(fullPhrase) {

    //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
    this.fullPhrase = fullPhrase;

    //regulation match array
    this.matchArray = this.fullPhrase.match(/(\w+)/g);
    console.log(this.matchArray);

    this.fluent = this.matchArray[0];
    this.name = this.matchArray[1];
    //the location and the name of the street
    this.X = parseInt(this.matchArray[3],10);
    this.Y = parseInt(this.matchArray[4],10);
    this.radius1 = parseInt(this.matchArray[5],10);
    this.radius2 = parseInt(this.matchArray[6],10);
    this.radius3 = parseInt(this.matchArray[7],10);

}


var obj2 = new Roundabout('roundabout(r1, coordinate(520, 500),20,70,120),');
console.log('fullPhrase: ' + obj2.fullPhrase);
console.log('fluent: ' + obj2.fluent);
console.log('name: ' + obj2.name);
console.log('x: ' + obj2.X);
console.log('y: ' + obj2.Y);

console.log('radius1: ' + obj2.radius1);
console.log('radius2: ' + obj2.radius2);
console.log('radius3: ' + obj2.radius3);
