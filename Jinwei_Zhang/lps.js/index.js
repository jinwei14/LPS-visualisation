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

// // Require pixi module
// var pixi = require('pixi');
//
// // You can use either WebGLRenderer or CanvasRenderer
// var renderer = pixi.WebGLRenderer(800, 600);
// document.body.appendChild(renderer.view);
//
// var stage = new pixi.Stage();
// var bunnyTexture = pixi.Texture.fromImage('./imgs/bunny.jpg');
// var bunny = new pixi.Sprite(bunnyTexture);
//
// bunny.position.x = 400;
// bunny.position.y = 300;
// bunny.scale.x = 2;
// bunny.scale.y = 2;
//
// stage.addChild(bunny);
//
// requestAnimationFrame(animate);
//
// function animate() {
//   bunny.rotation += 0.01;
//
//   renderer.render(stage);
//
//   requestAnimationFrame(animate);
// }

// var canvas = document.creaElement('canvas');
// document.body.appendChild(canvas);
//
// canvas.width = window.screen.width;
// canvas.height = window.screen.height;
//
// var context  = canvas.getContext('2d');
//
// var x = 0;
// var y = 0;
// window.requestAnimationFrame(function loop() {
//   x += 1;
//   y += 0.5;
//
//   context.clearRect(0, 0, canvas.width, canvas.height);
//
//   context.fillStyle = 'red';
//   context.fillRect(x, 0, 100, 100);
//
//   context.fillStyle = 'green';
//   context.fillRect(200, y, 100, 100);
//
//   window.requestAnimationFrame(loop);
// });

/* 1.we leave the file system for now for start up
   2. Read all the information into a dictionary
   3. start the animation process dump the buggy lps studio.
*/


const INDENTATION = '  ';
// this the object that need to be process at every time cycle
// the program should define the location as this format.
// location(yourCar, coordinate(9, 9), eastward)
function ResultDict(fullPhrase, timeStamp) {
  this.fullPhrase = fullPhrase;
  this.getObject = function () {
    var startPos = fullPhrase.indexOf('(');
    var endPos = fullPhrase.indexOf(',');
    return fullPhrase.slice(startPos + 1, endPos);
  };
  // should be location
  this.getFluent = function () {
    var endPos = fullPhrase.indexOf('(');
    return fullPhrase.slice(0, endPos);
  };
  //
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
  this.getHeading = function () {
    var startPos = fullPhrase.lastIndexOf(',');
    return fullPhrase.slice(startPos + 1, -1).trim();
  };
  this.timeStamp = timeStamp;
}

// this is a list of object that can access the
// eslint-disable-next-line vars-on-top
var TimeLine = [];

function generateSpec(programFile, specFile) {
  LPS.loadFile(programFile)
    .then((engine) => {
      let profiler = engine.getProfiler();
      console.log('% --- Specification generated for ' + programFile + '\n');

      engine.on('postCycle', () => {
        let currentTime = engine.getCurrentTime();
        let startTime = currentTime - 1;
        let endTime = currentTime;

        console.log('% --- Start of cycle ' + endTime + ' ---\n');
        // eslint-disable-next-line vars-on-top
        var cycle = [];
        console.log('expect_num_of(' + ['fluent', currentTime, profiler.get('numState')].join(', ') + ').\n');
        engine.getActiveFluents().forEach((termArg) => {
          let lpsTerm = LPS.literal(termArg);
          let args = lpsTerm.getArguments();
          let term = new LPS.Functor(lpsTerm.getName(), args);
          // location(yourCar, coordinate(9, 9), eastward)
          console.log(INDENTATION + 'expect(' + ['fluent', currentTime, term.toString()].join(', ') + ').\n');
          let obj1 = new ResultDict(term.toString(), currentTime);
          cycle.push(obj1);
        });
        TimeLine.push(cycle);
        if (startTime === 0) {
          console.log('\n');
          return;
        }

        console.log('expect_num_of(' + ['action', startTime, endTime, profiler.get('lastCycleNumActions')].join(', ') + ').\n');
        engine.getLastCycleActions().forEach((termArg) => {
          let lpsTerm = LPS.literal(termArg);
          let args = lpsTerm.getArguments();
          let term = new LPS.Functor(lpsTerm.getName(), args);
          console.log(INDENTATION + 'expect(' + ['action', startTime, endTime, term.toString()].join(', ') + ').\n');
        });

        console.log('expect_num_of(' + ['observation', startTime, endTime, profiler.get('lastCycleNumObservations')].join(', ') + ').\n');
        engine.getLastCycleObservations().forEach((termArg) => {
          let lpsTerm = LPS.literal(termArg);
          let args = lpsTerm.getArguments();
          let term = new LPS.Functor(lpsTerm.getName(), args);
          console.log(INDENTATION + 'expect(' + ['observation', startTime, endTime, term.toString()].join(', ') + ').\n');
        });

        console.log('expect_num_of(' + ['firedRules', endTime, profiler.get('lastCycleNumFiredRules')].join(', ') + ').\n');
        console.log('expect_num_of(' + ['resolvedGoals', endTime, profiler.get('lastCycleNumResolvedGoals')].join(', ') + ').\n');
        console.log('expect_num_of(' + ['unresolvedGoals', endTime, profiler.get('lastCycleNumUnresolvedGoals')].join(', ') + ').\n');
        console.log('expect_num_of(' + ['failedGoals', endTime, profiler.get('lastCycleNumFailedGoals')].join(', ') + ').\n');

        console.log('\n');
        // console.log(TimeLine);
      });

      engine.on('error', (err) => {
        console.log(err);
      });

      if (specFile !== null) {
        // write to file when program is done
        engine.on('done', () => {
          // fs.writeFile(specFile, buffer, () => {
          //   Logger.log('Spec file written to ' + specFile);
          // });
        });
      }

      // Logger.log('Executing ' + programFile);
      // Logger.log('-----');
      engine.run();
    }).catch((err) => {
      // Logger.error(err);
      console('this is the error message: ' + err);
    });
}

generateSpec('../Driving-Car-MoreJunctions/drivingCar.lps', null);
// var obj1 = new ResultDict('location(yourCar, coordinate(9, 9), eastward)', 6);
// console.log(obj1.getFluent());
// console.log(obj1.getHeading());
// console.log(obj1.getObject());
// console.log(obj1.getPosition());
// console.log(obj1.timeStamp);
//
// console.log(parseInt(obj1.getPosition()[0], 10));

// module.exports.ResultDict = ResultDict;
