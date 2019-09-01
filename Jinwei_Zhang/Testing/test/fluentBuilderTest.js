// // var outputArea = document.getElementById('outputArea');
// // var txtCodeInput = document.getElementById('txtCodeInput');
// // var btnRunProgram = document.getElementById('btnRunProgram');
//
// //this program is part of the sandbox js code we intend to phrase the sequence of fluent.
//
// function loadExample(element) {
//     var url = element.getAttribute('data-source');
//     var request = new XMLHttpRequest();
//     request.open('GET', url);
//     request.responseType = 'text';
//
//     request.onload = function () {
//         txtCodeInput.value = request.response;
//         txtCodeInput.disabled = false;
//         btnRunProgram.disabled = false;
//     };
//
//     txtCodeInput.value = 'Loading from ' + url;
//     txtCodeInput.disabled = true;
//     btnRunProgram.disabled = true;
//     request.send();
// }
//
// function runProgram(program) {
//     // var source = txtCodeInput.value;
//     // outputArea.innerHTML = '';
//     // btnRunProgram.disabled = true;
//
//     LPS.loadString(program)
//         .then((engine) => {
//             let profiler = engine.getProfiler();
//             let result = [];
//
//             let executionProgressBar = document.getElementById('executionProgressBar');
//
//             engine.setContinuousExecution(true);
//
//             engine.on('error', (err) => {
//                 // outputArea.innerHTML = '<p>Error: ' + err + '</p>';
//             });
//
//             engine.on('postCycle', () => {
//                 result.push({
//                     time: engine.getCurrentTime(),
//                     fluents: engine.getActiveFluents(),
//                     actions: engine.getLastCycleActions(),
//                     observations: engine.getLastCycleObservations(),
//                     duration: profiler.get('lastCycleExecutionTime')
//                 });
//             });
//
//             engine.on('done', () => {
//                 let maxCycles = result.length;
//                 for (let i = 0; i < maxCycles; i += 1) {
//                     result[i].fluents = result[i].fluents
//                         .map((f) => {
//                             return {
//                                 term: f,
//                                 length: 1
//                             };
//                         });
//                     result[i].overlappingFluents = 0;
//                 }
//
//                 for (let i = 0; i < maxCycles; i += 1) {
//                     let newFluents = [];
//                     let lastSeenCycle = i;
//                     let numInCycle = {};
//
//                     for (let j = i + 1; j < maxCycles; j += 1) {
//                         numInCycle[j] = 0;
//                     }
//                     result[i].fluents
//                         .forEach((fArg) => {
//                             let f = fArg;
//                             for (let j = i + 1; j < maxCycles; j += 1) {
//                                 let hasSameFluent = false;
//                                 result[j].fluents = result[j].fluents
//                                     .filter((otherF) => {
//                                         if (otherF.term === f.term) {
//                                             numInCycle[j] += 1;
//                                             f.length += 1;
//                                             hasSameFluent = true;
//                                             return false;
//                                         }
//                                         return true;
//                                     });
//                                 if (!hasSameFluent) {
//                                     break;
//                                 }
//                                 if (j > lastSeenCycle) {
//                                     lastSeenCycle = j;
//                                 }
//                             }
//                             for (let j = i + 1; j <= lastSeenCycle; j += 1) {
//                                 result[j].overlappingFluents
//                                     = result[i].overlappingFluents
//                                     + numInCycle[j];
//                             }
//                             newFluents.push(f);
//                         });
//                     // ensure that fluents are sorted by the longest ones first
//                     newFluents.sort((a, b) => {
//                         if (a.length === b.length) {
//                             return 0;
//                         }
//                         return a.length > b.length ? -1 : 1;
//                     });
//                     result[i].fluents = newFluents;
//                 }
//                 console.log(result);
//                 // btnRunProgram.disabled = false;
//                 // let table = buildTableForResults(result);
//                 // outputArea.appendChild(table);
//             });
//
//             engine.run();
//         })
//         .catch((err) => {
//             // outputArea.innerHTML = '<p>Error: ' + err + '</p>';
//         });
// }
//
//
// let program = '% loadModule(\'./modules/module.js\').\n' +
//     '% true -> testPrint(\'The car has started\').\n' +
//     '% set of facts.\n' +
//     'fluents([moving, stopped, waitting, loc(Car,X,Y)]).\n' +
//     '% cause state transition via init fact terminate fact\n' +
//     'events ([redLight,greenLight]).\n' +
//     '\n' +
//     'actions([arrival,carMoveTo(Car,NewX, B)]).\n' +
//     '\n' +
//     '% describes the facts that are true at time 1\n' +
//     'initially([moving, loc(car,150,340)]).\n' +
//     'lpsDefineObject(car, image, [\n' +
//     '  position(150, 340),\n' +
//     '  size(64, 64),\n' +
//     '  isHidden(0),\n' +
//     '  image(car),\n' +
//     '  zIndex(100)\n' +
//     ']).\n' +
//     '% describe events taking place in the transition from one time point to the next\n' +
//     'observe(redLight,1,2).\n' +
//     'observe(greenLight,3,4).\n' +
//     'observe(redLight,7,8).\n' +
//     'observe(greenLight,9,10).\n' +
//     '\n' +
//     'moving(T1),loc(car,A,B) ->\n' +
//     '  carMoveTo(car, A + 100, B) from T1 to T2,\n' +
//     '  lpsAnimateMoveObject(car, 2, A + 100, B) from T2 to T3.\n' +
//     '\n' +
//     'updates(carMoveTo(CAR, X, Y), loc(CAR,_, Y), loc(CAR,X, Y)).\n' +
//     'initiates(redLight, waitting).\n' +
//     'terminates(redLight, moving).\n' +
//     'initiates(greenLight, moving).\n' +
//     'terminates(greenLight, waitting).\n' +
//     'initiates(arrival, stopped).\n' +
//     'terminates(arrival, moving).\n'
// runProgram(program);
