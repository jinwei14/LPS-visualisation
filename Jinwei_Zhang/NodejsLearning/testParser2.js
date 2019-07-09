//this parser file is for testing the parser for the location of the car.
const INDENTATION = '  ';
// this the object that need to be process at every time cycle
// loc(car, 1650, 340)).
// location(yourCar, coordinate(9, 9), eastward)
function ResultDict(fullPhrase,timeStamp) {


    //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
    this.fullPhrase = fullPhrase;

    //the time stamp that this fluent changed
    this.timeStamp = timeStamp;

    //regulation match array
    var regex = /(\w+)/g;
    this.matchArray = this.fullPhrase.match(regex);

    console.log(this.matchArray);

    //the object that is changing such as Car , Truck etx
    this.getObjectName = function () {
        var coordinate = ['coordinate', 'loc', 'location', 'coor','pos','position','xy'];
        var len = this.matchArray.length;
        //if the word is not one of the words in the coordinate array and not a digit it will be the name
        //of the object
        for (var i = 1; i < len; i++) {
            if (isNaN(this.matchArray[i] ) && coordinate.includes(this.matchArray[i].toLowerCase()) === false){
                return this.matchArray[i];
            }
        }
    };

    // should be the fluent that changed such as : loc, location.
    this.getFluent = function () {
        var endPos = fullPhrase.indexOf('(');
        return fullPhrase.slice(0, endPos);
    };

    //position is a list of number which specify the number of position.
    this.getPosition = function () {
        var r = /\d+/g;
        var s = fullPhrase;
        var m;
        var retList = [];
        while ((m = r.exec(s)) != null) {
            retList.push(parseInt(m[0], 10));
        }
        return retList;
    };

    this.X = parseInt(this.getPosition()[0], 10);
    this.Y = parseInt(this.getPosition()[1], 10);

    //the heading is optional. If there is a heading then get the heading as the form of
    this.getHeading = function () {
        var orientation =
            [
                'north', 'south', 'west', 'east',
                'up', 'down', 'left', 'right',
                'northward', 'southward', 'westward', 'eastward'
            ];
        var len = this.matchArray.length;
        for (var i = 0; i < len; i++) {
            //check if any of the works in the matching array is in the orientation array
            if (orientation.includes(this.matchArray[i].toLowerCase())){
                return this.matchArray[i];
            }
        }
    };

}


function VehicleLoc(fullPhrase, timeStamp) {
    //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
    this.fullPhrase = fullPhrase;

    //the time stamp that this fluent changed
    this.timeStamp = timeStamp;

    //regulation match array
    this.matchArray = this.fullPhrase.match(/(\w+)/g);

    console.log(this.matchArray);

    //the object that is changing such as Car , Truck etx
    this.getObjectName = this.matchArray[1];

    // should be the fluent that changed such as : loc, location.
    this.getFluent = this.matchArray[0];

    //the x and y position of the car

    this.X = parseInt(this.matchArray[3], 10);
    this.Y = parseInt(this.matchArray[4], 10);

    //the heading is optional. If there is a heading then get the heading as the form of
    this.getHeading = this.matchArray[5];



}

//location(yourCar, coordinate(9, 9), eastward)
//loc(car, 1650, 340))
//position(dummyCar, xy(66.90)).


// var obj2 = new ResultDict('location(car0, coordinate(9, 9), eastward)', 30);
// console.log('Fluent: ' + obj2.getFluent());
// console.log('heading: ' + obj2.getHeading());
// console.log('Object name: ' + obj2.getObjectName());
// console.log('Position: ' + obj2.getPosition());
// console.log('Timestamp: ' + obj2.timeStamp);
// console.log('x: ' + obj2.X);
// console.log('y: ' + obj2.Y);
// console.log(parseInt(obj2.getPosition()[0], 10));
// console.log(parseInt(obj2.getPosition()[1], 10));


var obj2 = new VehicleLoc('location(car0, coordinate(9, 9), eastward)', 30);
console.log('Fluent: ' + obj2.getFluent);
console.log('heading: ' + obj2.getHeading);
console.log('Object name: ' + obj2.getObjectName);
console.log('Timestamp: ' + obj2.timeStamp);
console.log('x: ' + obj2.X);
console.log('y: ' + obj2.Y);
