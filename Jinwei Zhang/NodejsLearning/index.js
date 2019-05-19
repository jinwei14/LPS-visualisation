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

let myGreeting2 = setTimeout(()=> {
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


console.log('Hello stipid this will execute first');

//thsi asynchronized method will not necessary execute after the first one
function displayTime() {
   let date = new Date();
   let time = date.toLocaleTimeString();
   console.log(date+time);
}

const createClock = setInterval(displayTime, 1000);
clearInterval(createClock);


// a Promise is an object that represents an intermediate state of an operation
// — in effect, a promise that a result of some kind will be returned at some point
// in the future. There is no guarantee of exactly when the operation will complete
// and the result will be returned, but there is a guarantee that when the result
// is available, or the promise fails, the code you provide will be executed
// in order to do something else with a successful result, or to gracefully handle
// a failure case.


// Making asynchronous programming easier with async and await
async function hello() {
  return "Hello using promise";
};

async function helloRet() {
  return  "fuck you";
};
console.log("this exebefore hello");
hello().then((value) => console.log(value))
hello().then(console.log)

// helloRet((ret)=>{
//   console.log(ret);
// })
// console.log(hello());

console.log('a'+'b');
