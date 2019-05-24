/*
  This file is part of the lps.js project, released open source under
  the BSD 3-Clause license. For more info, please see https://github.com/mauris/lps.js
 */

const LPS = require('./src/LPS');
const meta = require('./package.json');
LPS.meta = meta;

if (process.browser) {
  window.LPS = LPS;
}

console.log('Order of execution: ');
console.log('index -> LPS(loadFile) -> ProgramFactory(fromFile) -> Parser(source, pathname) -> _lexer.get()');

LPS.loadFile('../Driving-Car-MoreJunctions/drivingCar.lps')
  .then((engine) => {
    engine.run();
  });

module.exports = LPS;
