// this parser file is the parser for te traffic light
function TrafficLight(fullPhrase) {

    //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
    this.fullPhrase = fullPhrase;

    //regulation match array
    this.matchArray = this.fullPhrase.match(/(\w+)/g);
    console.log(this.matchArray);

    this.fluent = this.matchArray[0];
    //the location and the name of the street
    this.X = parseInt(this.matchArray[2],10);
    this.Y = parseInt(this.matchArray[3],10);


    //the color of the traffic light
    this.color = this.matchArray[4];

    //the direction that the traffic light os facing
    this.direct = this.matchArray[5];

}


var obj2 = new TrafficLight('trafficLight(coordinate(2, 2), red, eastward).');
console.log('fullPhrase: ' + obj2.fullPhrase);
console.log('fluent: ' + obj2.fluent);
console.log('x: ' + obj2.X);
console.log('y: ' + obj2.Y);
console.log('color: ' + obj2.color);
console.log('direct: ' + obj2.direct);


console.log("car1","car2");


var assert = require('assert');
describe('TrafficLight data structure Testing', function() {
    it('full test cases:', function() {
        assert.deepEqual(obj2.fullPhrase, 'trafficLight(coordinate(2, 2), red, eastward).');
    });


    it('fluent test:', function() {
        assert.equal(obj2.fluent, 'trafficLight');
    });

    it('X Y test:', function() {
        assert.equal(obj2.X, 2);
        assert.equal(obj2.Y, 2);
    });

    it('color test:', function() {
        assert.equal(obj2.color, 'red');
    });

    it('Direction test:', function() {
        assert.equal(obj2.direct, 'eastward');
    });
});