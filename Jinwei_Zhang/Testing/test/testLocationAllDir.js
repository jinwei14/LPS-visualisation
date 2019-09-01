function VehicleLoc(fullPhrase, timeStamp) {
    //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
    this.fullPhrase = fullPhrase;

    //the time stamp that this fluent changed
    this.timeStamp = timeStamp;

    //regulation match array
    this.matchArray = this.fullPhrase.match(/(\w+)/g);

    //the object that is changing such as Car , Truck etx
    this.getObjectName = this.matchArray[1];

    // should be the fluent that changed such as : loc, location.
    this.getFluent = this.matchArray[0];


    //the heading is optional. If there is a heading then get the heading as the form of
    var regex = new RegExp('\\b' + 'dir' + '\\b');
    dirIndex = fullPhrase.search(regex);

    dir = fullPhrase.slice(dirIndex,fullPhrase.length-1);
    // console.log(dir);
    dirX = dir.slice(dir.indexOf('(')+1,dir.indexOf(','));
    dirY = dir.slice(dir.indexOf(',')+1,dir.indexOf(')'));
    // console.log(dirX,dirY);
    this.getHeading = [parseFloat(dirX),parseFloat(dirY)];



    //the x and y position of the car
    var regex1 = new RegExp('\\b' + 'coordinate' + '\\b');
    locationIndex = fullPhrase.search(regex1);

    locationStr = fullPhrase.slice(locationIndex,dirIndex);
    // console.log(location);
    XStr = locationStr.slice(locationStr.indexOf('(')+1,locationStr.indexOf(','));
    YStr = locationStr.slice(locationStr.indexOf(',')+1,locationStr.indexOf(')'));
    this.X = parseFloat(XStr);
    this.Y = parseFloat(YStr);
    // console.log(this.X, this.Y);

    this.writeOut = function () {
        return this.getFluent + '('
            + this.getObjectName
            + ',' + this.matchArray[2]
            + '('+ this.X.toString()+','+ this.Y.toString()+'),'
            + 'dir('+this.getHeading[0].toString()+','+ this.getHeading[1].toString()+ ')),'
    }
}

// var obj2 = new VehicleLoc('location(car0, coordinate(9, 9), dir(0,-1))', 30);

var obj1 = new VehicleLoc('location(car0, coordinate(423.32050807568874, 475),dir(-0.8660254037844384, 0.5000000000000004))', 30);

var obj3 = new VehicleLoc('location(car0, coordinate(492.6025403784439, 525), dir(3.885780586188048e-16, 1))', 30);
// obj2.getHeading = 'northward';
console.log('full array:   ' + obj3.matchArray);
console.log('Fluent:       ' + obj3.getFluent);
console.log('heading:      ' + obj3.getHeading);
console.log('heading X:    ' + obj3.getHeading[0]);
console.log('heading Y:    ' + obj3.getHeading[1]);
console.log('Object name:  ' + obj3.getObjectName);
console.log('Timestamp:    ' + obj3.timeStamp);
console.log('x:            ' + obj3.X);
console.log('y:            ' + obj3.Y);

console.log(obj3.writeOut());

var cars = [
    "Saab",
    "Volvo",
    "BMW"
];
arr1 = [1,0];
arr2 = [1,0];
console.log([1,0] === [1,0]);
console.log(arr1[0] === arr2[0]);


var assert = require('assert');
describe('All Direction Testing', function() {
    it('full array:', function() {
        assert.deepEqual(obj3.matchArray,  [
            'location',
            'car0',
            'coordinate',
            '492',
            '6025403784439',
            '525',
            'dir',
            '3',
            '885780586188048e',
            '16',
            '1'
        ] );
    });

    it('Fluent', function() {
        assert.equal(obj3.getFluent, 'location');
    });


    it('heading:', function() {
        assert.deepEqual(obj3.getHeading, [
            3.885780586188048e-16,
            1
        ] );
    });

    it('heading X', function() {
        assert.deepEqual(obj3.getHeading[0], 3.885780586188048e-16 );
    });

    it('heading Y:', function() {
        assert.deepEqual(obj3.getHeading[1], 1 );
    });

    it('Object name:', function() {
        assert.equal(obj3.getObjectName, 'car0' );
    });

    it('Timestamp:', function() {
        assert.equal(obj3.timeStamp, 30 );
    });

    it('X:', function() {
        assert.equal(obj3.X, 492.6025403784439 );
    });

    it('Y:', function() {
        assert.equal(obj3.Y, 525 );
    });

});

