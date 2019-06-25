// this parser file is the parser for te animated cloud.
function Cloud(fullPhrase) {

    //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
    this.fullPhrase = fullPhrase;

    //regulation match array
    this.matchArray = this.fullPhrase.match(/(\w+)/g);
    console.log(this.matchArray);

    this.fluent = this.matchArray[0];
    //the location and the name of the street
    this.X = parseInt(this.matchArray[2],10);
    this.Y = parseInt(this.matchArray[3],10);

}


var obj2 = new Cloud('cloud(coordinate(2, 2)).');
console.log('fullPhrase: ' + obj2.fullPhrase);
console.log('fluent: ' + obj2.fluent);
console.log('x: ' + obj2.X);
console.log('y: ' + obj2.Y);


