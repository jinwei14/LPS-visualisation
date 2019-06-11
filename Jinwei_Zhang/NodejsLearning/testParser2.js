const INDENTATION = '  ';
// this the object that need to be process at every time cycle
// location(yourCar, coordinate(9, 9), eastward)
function ResultDict(fullPhrase, timeStamp) {

    //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
    this.fullPhrase = fullPhrase;

    //the time stamp that this fluent changed
    this.timeStamp = timeStamp;

    //the object that is changing such as Car , Truck etx
    this.getObject = function () {
        var startPos = fullPhrase.indexOf('(');
        var endPos = fullPhrase.indexOf(',');
        return fullPhrase.slice(startPos + 1, endPos);
    };

    // should the fluent that changed.
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

    //the heading is optional.
    this.getHeading = function () {
        var startPos = fullPhrase.lastIndexOf(',');
        return fullPhrase.slice(startPos + 1, -1).trim();
    };

}

var obj2 = new ResultDict('loc(car, 1650, 340)).',30);
console.log('Fluent: '+obj2.getFluent());
console.log('heading: '+ obj2.getHeading());
console.log('Object:' + obj2.getObject());
console.log('Position: '+ obj2.getPosition());
console.log('Timestamp: '+ obj2.timeStamp);

console.log(parseInt(obj2.getPosition()[0], 10));
