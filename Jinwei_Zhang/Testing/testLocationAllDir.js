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

    //the x and y position of the car

    this.X = parseInt(this.matchArray[3], 10);
    this.Y = parseInt(this.matchArray[4], 10);

    //the heading is optional. If there is a heading then get the heading as the form of
    var regex = new RegExp('\\b' + 'dir' + '\\b');
    dirIndex = fullPhrase.search(regex);

    dir = fullPhrase.slice(dirIndex,fullPhrase.length-2);
    console.log(dir);
    dirX = dir.slice(dir.indexOf('(')+1,dir.indexOf(','));
    dirY = dir.slice(dir.indexOf(',')+1,dir.indexOf(')'));

    console.log(dirX,dirY);
    this.getHeading = [parseInt(dirX),parseInt(dirY)];

    this.writeOut = function () {
        return this.getFluent + '('
            + this.getObjectName
            + ',' + this.matchArray[2]
            + '('+ this.X.toString()+','+ this.Y.toString()+'),'
            + 'dir('+this.getHeading[0].toString()+','+ this.getHeading[1].toString()+ ')),'
    }
}

var obj2 = new VehicleLoc('location(car0, coordinate(9, 9), dir(11,-9)).', 30);
// obj2.getHeading = 'northward';
console.log("full  array" + obj2.matchArray);
console.log('Fluent: ' + obj2.getFluent);
console.log('heading: ' + obj2.getHeading);
console.log('heading X: ' + obj2.getHeading[0]);
console.log('heading Y: ' + obj2.getHeading[1]);
console.log('Object name: ' + obj2.getObjectName);
console.log('Timestamp: ' + obj2.timeStamp);
console.log('x: ' + obj2.X);
console.log('y: ' + obj2.Y);

console.log(obj2.writeOut());

var cars = [
    "Saab",
    "Volvo",
    "BMW"
];
arr1 = [1,0];
arr2 = [1,0];
console.log([1,0] === [1,0]);
console.log(arr1[0] === arr2[0]);
