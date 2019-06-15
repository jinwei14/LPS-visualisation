// this parser file is the parser for te traffic light
function TrafficLight(fullPhrase) {

    //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
    this.fullPhrase = fullPhrase;

    //regulation match array
    this.matchArray = this.fullPhrase.match(/(\w+)/g);
    console.log(this.matchArray);

    this.fluent = this.matchArray[0];
    //the location and the name of the street
    this.X = this.matchArray[2];
    this.Y = this.matchArray[3];

    //ths status of the traffic light
    this.status = this.matchArray[4];

    //the color of the traffic light
    this.color = this.matchArray[5];

    //the number of lanes on the street
    this.direct = this.matchArray[6];

}


var obj2 = new TrafficLight('trafficLight(coordinate(2, 2), on, Red, eastward).');
console.log('fullPhrase: ' + obj2.fullPhrase);
console.log('fluent: ' + obj2.fluent);

console.log('x: ' + obj2.X);
console.log('y: ' + obj2.Y);
console.log('status: ' + obj2.status);
console.log('color: ' + obj2.color);
console.log('direct: ' + obj2.direct)
