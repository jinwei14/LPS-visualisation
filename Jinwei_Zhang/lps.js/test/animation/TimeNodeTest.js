var fullPhrase = 'location(yourCar, coordinate(9, 9), eastward)';
var timeStamp = 5;

var ResultDict = require('../../index.js')((fullPhrase, timeStamp));

var obj1 = ResultDict(fullPhrase, timeStamp);

// var testing1 = new ResultDict("location(yourCar, coordinate(9, 9), eastward)", 0);

console.log(obj1);
