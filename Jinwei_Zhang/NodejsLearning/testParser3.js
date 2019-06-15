//this test parser will test the street predicate


const INDENTATION = '  ';
// this the object that need to be process at every time cycle

// street(piccadillyRoad, coordinate(9, 9), 80, 70, 2)
function Streets(fullPhrase) {



    //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
    this.fullPhrase = fullPhrase;

    //regulation match array
    this.matchArray = this.fullPhrase.match(/(\w+)/g);
    console.log(this.matchArray);
    this.fluent = this.matchArray[0];

    //the location and the name of the street
    this.X = this.matchArray[3];
    this.Y = this.matchArray[4];
    this.name = this.matchArray[1];

    //the width of the street
    this.width = this.matchArray[5];

    //the height of the street
    this.height = this.matchArray[6];

    //the number of lanes on the street
    this.no_lane = this.matchArray[7];

}

//location(yourCar, coordinate(9, 9), eastward)
//loc(car, 1650, 340))
//position(dummyCar, xy(66.90)).
var obj2 = new Streets('street(piccadillyRoad, coordinate(9, 9), 80, 70, 2).');
console.log('fullPhrase: ' + obj2.fullPhrase);
console.log('fluent: ' + obj2.fluent);
console.log('name: ' + obj2.name);
console.log('x: ' + obj2.X);
console.log('y: ' + obj2.Y);
console.log('width: ' + obj2.width);
console.log('height: ' + obj2.height);
console.log('no_lane: ' + obj2.no_lane)

