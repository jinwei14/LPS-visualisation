// import Person from './person' //es6
const Person = require('./person'); // common js

const person1 = new Person('John Doe', 30);

person1.greeting();


const LPS = require('lps');
LPS.loadFile('emoji.lps')
    .then((engine) => {
        engine.run();
    });


//old-style callbacks and newer promise-style code
function sayHi(who) {
    console.log('Hello ' + who + '!');
}

let myGreeting0 = setTimeout(sayHi, 2000, 'Mr. Universe');

let myGreeting1 = setTimeout(function sayHi(who) {
    console.log('Hello ' + who + '! with parameter');
}, 2000, 'Mr. Universe');

let myGreeting2 = setTimeout(() => {
    console.log('Hello with no param!');
}, 2000);

// let myGreeting3 = setTimeout(()=> {
//   res = 'Hello 3!'
//   console.log(res);
//   return res
// }, 2000, 'Mr. Universe').then(function(prevRes){
//   console.log(prevRes);
// }).catch(function(err){
//   console.log('Fetch problem: ' + err.message);
// });


console.log('Hello stupid this will execute first');

//thsi asynchronized method will not necessary execute after the first one
function displayTime() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    console.log(date + time);
}

const createClock = setInterval(displayTime, 1000);
clearInterval(createClock);










