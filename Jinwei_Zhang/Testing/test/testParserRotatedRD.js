// // this parser file is the parser for te animated cloud.
// function RotateRoad(fullPhrase) {
//
//     //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
//     this.fullPhrase = fullPhrase;
//
//     //regulation match array
//     this.matchArray = this.fullPhrase.match(/(\w+)/g);
//     console.log(this.matchArray);
//
//     this.fluent = this.matchArray[0];
//     this.name = this.matchArray[1];
//     //the location and the name of the street
//     this.X1 = parseInt(this.matchArray[3],10);
//     this.Y1 = parseInt(this.matchArray[4],10);
//     this.X2 = parseInt(this.matchArray[6],10);
//     this.Y2 = parseInt(this.matchArray[7],10);
//     this.X3 = parseInt(this.matchArray[9],10);
//     this.Y3 = parseInt(this.matchArray[10],10);
//     this.X4 = parseInt(this.matchArray[12],10);
//     this.Y4 = parseInt(this.matchArray[13],10);
//
// }
//
//
// var obj2 = new RotateRoad('rotateStreet(yStreet, coordinate(660, 225), coordinate(710, 275),coordinate(595, 474),coordinate(539, 441)).');
// console.log('fullPhrase: ' + obj2.fullPhrase);
// console.log('fluent: ' + obj2.fluent);
// console.log('name: ' + obj2.name);
// console.log('x1: ' + obj2.X1);
// console.log('y1: ' + obj2.Y1);
// console.log('x2: ' + obj2.X2);
// console.log('y2: ' + obj2.Y2);
// console.log('x3: ' + obj2.X3);
// console.log('y3: ' + obj2.Y3);
// console.log('x4: ' + obj2.X4);
// console.log('y4: ' + obj2.Y4);
//
//
