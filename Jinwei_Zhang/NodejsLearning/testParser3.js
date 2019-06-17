//this test parser will test the street predicate


// this the object that need to be process at every time cycle

// street(piccadillyRoad, coordinate(9, 9), 80, 70, 2)
function Streets(fullPhrase) {



    //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
    this.fullPhrase = fullPhrase;

    //regulation match array
    this.matchArray = this.fullPhrase.match(/(\w+)/g);

    this.fluent = this.matchArray[0];

    //the location and the name of the street
    this.X = parseInt(this.matchArray[3],10);
    this.Y = parseInt(this.matchArray[4],10);
    this.name = this.matchArray[1];


    //the width of the street
    this.width = parseInt(this.matchArray[5],10);

    //the height of the street
    this.height = parseInt(this.matchArray[6],10);

    //the number of lanes on the street
    this.no_lane = parseInt(this.matchArray[7],10);

}

//location(yourCar, coordinate(9, 9), eastward)
//loc(car, 1650, 340))
//position(dummyCar, xy(66.90)).
var obj2 = new Streets('street(piccadillyRoad, coordinate(9, 9), 80, 70, 2).');
console.log('match array: '+ obj2.matchArray);
console.log('fullPhrase: ' + obj2.fullPhrase);
console.log('fluent: ' + obj2.fluent);
console.log('name: ' + obj2.name);
console.log('x: ' + obj2.X);
console.log('y: ' + obj2.Y);
console.log('width: ' + obj2.width);
console.log('height: ' + obj2.height);
console.log('no_lane: ' + obj2.no_lane)

