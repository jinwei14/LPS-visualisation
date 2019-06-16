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
    // eslint-disable-next-line no-cond-assign
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

// eslint-disable-next-line no-unused-vars
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

      // if (specFile !== null) {
      //   // write to file when program is done
      //   engine.on('done', () => {
      //     // fs.writeFile(specFile, buffer, () => {
      //     //   Logger.log('Spec file written to ' + specFile);
      //     // });
      //   });
      // }

      // Logger.log('Executing ' + programFile);
      // Logger.log('-----');
      engine.run();
    }).catch((err) => {
    // Logger.error(err);
      console.log('this is the error message: ' + err);
    });
}

// generateSpec('../Driving-Car-MoreJunctions/drivingCar.lps', null);
// var obj1 = new ResultDict('location(yourCar, coordinate(9, 9), eastward)', 6);
// console.log(obj1.getFluent());
// console.log(obj1.getHeading());
// console.log(obj1.getObject());
// console.log(obj1.getPosition());
// console.log(obj1.timeStamp);
//
// console.log(parseInt(obj1.getPosition()[0], 10));

// module.exports.ResultDict = ResultDict;

// eslint-disable-next-line no-unused-vars
function loadExample(element) {
  // var url = element.getAttribute('data-source');
  // var request = new XMLHttpRequest();
  // request.open('GET', url);
  // request.responseType = 'text';
  //
  // request.onload = function () {
  //   txtCodeInput.value = request.response;
  //   txtCodeInput.disabled = false;
  //   btnRunProgram.disabled = false;
  // };
  //
  // txtCodeInput.value = 'Loading from ' + url;
  // txtCodeInput.disabled = true;
  // btnRunProgram.disabled = true;
  // request.send();
}

// eslint-disable-next-line no-unused-vars
function runProgram(program) {
  // var source = txtCodeInput.value;
  // outputArea.innerHTML = '';
  // btnRunProgram.disabled = true;

  LPS.loadString(program)
    .then((engine) => {
      let profiler = engine.getProfiler();
      let result = [];

      // let executionProgressBar = document.getElementById('executionProgressBar');

      // engine.setContinuousExecution(true);

      engine.on('error', (err) => {
        // outputArea.innerHTML = '<p>Error: ' + err + '</p>';
        console.log(err);
      });

      engine.on('postCycle', () => {
        result.push({
          time: engine.getCurrentTime(),
          fluents: engine.getActiveFluents(),
          actions: engine.getLastCycleActions(),
          observations: engine.getLastCycleObservations(),
          duration: profiler.get('lastCycleExecutionTime')
        });
        console.log(engine.getActiveFluents());
      });

      // engine.on('done', () => {
      //   let maxCycles = result.length;
      //   for (let i = 0; i < maxCycles; i += 1) {
      //     result[i].fluents = result[i].fluents
      //       .map((f) => {
      //         return {
      //           term: f,
      //           length: 1
      //         };
      //       });
      //     result[i].overlappingFluents = 0;
      //   }
      //
      //   for (let i = 0; i < maxCycles; i += 1) {
      //     let newFluents = [];
      //     let lastSeenCycle = i;
      //     let numInCycle = {};
      //
      //     for (let j = i + 1; j < maxCycles; j += 1) {
      //       numInCycle[j] = 0;
      //     }
      //     result[i].fluents
      //       .forEach((fArg) => {
      //         let f = fArg;
      //         for (let j = i + 1; j < maxCycles; j += 1) {
      //           let hasSameFluent = false;
      //           result[j].fluents = result[j].fluents
      //             .filter((otherF) => {
      //               if (otherF.term === f.term) {
      //                 numInCycle[j] += 1;
      //                 f.length += 1;
      //                 hasSameFluent = true;
      //                 return false;
      //               }
      //               return true;
      //             });
      //           if (!hasSameFluent) {
      //             break;
      //           }
      //           if (j > lastSeenCycle) {
      //             lastSeenCycle = j;
      //           }
      //         }
      //         for (let j = i + 1; j <= lastSeenCycle; j += 1) {
      //           result[j].overlappingFluents = result[i].overlappingFluents
      //             + numInCycle[j];
      //         }
      //         newFluents.push(f);
      //       });
      //     // ensure that fluents are sorted by the longest ones first
      //     newFluents.sort((a, b) => {
      //       if (a.length === b.length) {
      //         return 0;
      //       }
      //       return a.length > b.length ? -1 : 1;
      //     });
      //     result[i].fluents = newFluents;
      //   }
      //   console.log(result);
      //   console.log(result[0].fluents);
      //   // btnRunProgram.disabled = false;
      //   // let table = buildTableForResults(result);
      //   // outputArea.appendChild(table);
      // });

      engine.run();
    })
    .catch((err) => {
      // outputArea.innerHTML = '<p>Error: ' + err + '</p>';
      console.log(err);
    });
}


let program = `% loadModule('./modules/module.js').
% true -> testPrint('The car has started').
% set of facts.
fluents([moving, stopped, waitting,loc(Car,X,Y), goal(Car,X,Y)]).
% cause state transition via init fact terminate fact
events ([redLight,greenLight]).


actions([arrival,carMoveTo(Car,NewX, B)]).

% describes the facts that are true at time 1
initially([moving, loc(car,150,340), goal(car1,100,100)]).
lpsDefineObject(car, image, [
  position(150, 340),
  size(64, 64),
  isHidden(0),
  image(car),
  zIndex(100)
]).
% describe events taking place in the transition from one time point to the next
observe(redLight,1,2).
observe(greenLight,3,4).
observe(redLight,7,8).
observe(greenLight,9,10).

moving(T1),loc(car,A,B) ->
carMoveTo(car, A + 100, B) from T1 to T2,
  lpsAnimateMoveObject(car, 2, A + 100, B) from T2 to T3.

updates(carMoveTo(CAR, X, Y), loc(CAR,_, Y), loc(CAR,X, Y)).
initiates(redLight, waitting).
terminates(redLight, moving).
initiates(greenLight, moving).
terminates(greenLight, waitting).
initiates(arrival, stopped).
terminates(arrival, moving).
`;
runProgram(program);
