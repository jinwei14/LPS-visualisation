// if (process.browser) {
//     window.LPS = LPS;
// }

console.log('index -> LPS(loadFile) -> ProgramFactory(fromFile) -> Parser(source, pathname) -> _lexer.get()');
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
//     'terminates(arrival, moving).\n';

var program = '';


// Event handling on the broswer life clcle for parse the text file
document.addEventListener("DOMContentLoaded", function (event) {
        function parserText(event) {

            //open up the content of the  visualiser
            program = document.getElementById("exampleFormControlTextarea1").value;
            console.log(program);
            var message = "<h6> Successfully passing LPS program to the parser ! </h6>";

            document.getElementById("output").innerHTML = message;

            //make display text box appear
            var vis = document.getElementById("content");
            if (vis.style.display === "none") {
                vis.style.display = "block";
            }

            generateSpec(program, null);
        }

        //clear the content of the input box and disable the visualiser
        function clearText(event){
            document.getElementById("exampleFormControlTextarea1").value = "";
            var message = "<h6> Successfully cleared the lps program ! </h6>";

            document.getElementById("output").innerHTML = message;
            var vis = document.getElementById("content");
            if (vis.style.display === "block") {
                vis.style.display = "none";
            }
        }
        // Unobtrusive event binding
        // // this method will have soome convint point like
        // change the button text after click
        // instead of using another selector API.
        document.querySelector("#AnimateButton").addEventListener("click", parserText);
        document.querySelector("#ClearButton").addEventListener("click", clearText);


    }
);




/* 1.we leave the file system for now for start up
   2. Read all the information into a dictionary
   3. start the animation process dump the buggy lps studio.
*/


const INDENTATION = '  ';
// this the object that need to be process at every time cycle
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



    LPS.loadString(programFile)
        .then((engine) => {
            let profiler = engine.getProfiler();
            console.log('% --- Specification generated for ' + programFile + '\n');

            engine.on('postCycle', () => {
                let currentTime = engine.getCurrentTime();
                let startTime = currentTime - 1;
                let endTime = currentTime;

                console.log('% --- Start of cycle ' + endTime + ' ---\n');
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

            });

            engine.on('error', (err) => {
                console.log(err);
            });

            engine.run();
        }).catch((err) => {
        console.log('this is the error message: ' + err);
    });
}


var obj2 = new ResultDict('loc(car, 1650, 340)).',10);
console.log('Fluent: '+obj2.getFluent());
console.log('heading: '+ obj2.getHeading());
console.log('Object:' + obj2.getObject());
console.log('Position: '+ obj2.getPosition());
console.log('Timestamp: '+ obj2.timeStamp);

console.log(parseInt(obj2.getPosition()[0], 10));
// var obj1 = new ResultDict('location(yourCar, coordinate(9, 9), eastward)', 6);
// console.log(obj1.getFluent());
// console.log(obj1.getHeading());
// console.log(obj1.getObject());
// console.log(obj1.getPosition());
// console.log(obj1.timeStamp);

// console.log(parseInt(obj1.getPosition()[0], 10));

// module.exports.ResultDict = ResultDict;