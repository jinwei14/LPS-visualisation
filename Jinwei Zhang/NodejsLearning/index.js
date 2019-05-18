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
