// if (process.browser) {
//     window.LPS = LPS;
// }
(function (window) {
    console.log('index -> LPS(loadFile) -> ProgramFactory(fromFile) -> Parser(source, pathname) -> _lexer.get()');
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
                appManager.createVisualizer();
                appManager.addChildren();
                console.log('the inner called');
            }

            //clear the content of the input box and disable the visualiser
            function clearText(event) {
                document.getElementById("exampleFormControlTextarea1").value = "";
                var message = "<h6> Successfully cleared the lps program ! </h6>";

                document.getElementById("output").innerHTML = message;
                var vis = document.getElementById("content");
                // if (vis.style.display === "block") {
                //     vis.style.display = "none";
                // }
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
    function ResultDict(fullPhrase, timeStamp) {


        //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
        // // location(yourCar, coordinate(9, 9), eastward)
        this.fullPhrase = fullPhrase;

        //the time stamp that this fluent changed
        this.timeStamp = timeStamp;

        //regulation match array
        var regex = /(\w+)/g;
        this.matchArray = this.fullPhrase.match(regex);

        console.log(this.matchArray);

        //the object that is changing such as Car , Truck etx
        this.getObject = function () {
            var coordinate = ['coordinate', 'loc', 'location', 'coor', 'pos', 'position', 'xy'];
            var len = this.matchArray.length;
            //if the word is not one of the words in the coordinate array and not a digit it will be the name
            //of the object
            for (var i = 1; i < len; i++) {
                if (isNaN(this.matchArray[i]) && coordinate.includes(this.matchArray[i].toLowerCase()) === false) {
                    return this.matchArray[i];
                }
            }
        };

        // should be the fluent that changed such as : loc, location.
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

        //the heading is optional. If there is a heading then get the heading as the form of
        this.getHeading = function () {
            var orientation =
                [
                    'north', 'south', 'west', 'east',
                    'up', 'down', 'left', 'right',
                    'northward', 'southward', 'westward', 'eastward'
                ];
            var len = this.matchArray.length;
            for (var i = 0; i < len; i++) {
                //check if any of the works in the matching array is in the orientation array
                if (orientation.includes(this.matchArray[i].toLowerCase())) {
                    return this.matchArray[i];
                }
            }
        };

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

                    // console.log('expect_num_of(' + ['action', startTime, endTime, profiler.get('lastCycleNumActions')].join(', ') + ').\n');
                    // engine.getLastCycleActions().forEach((termArg) => {
                    //     let lpsTerm = LPS.literal(termArg);
                    //     let args = lpsTerm.getArguments();
                    //     let term = new LPS.Functor(lpsTerm.getName(), args);
                    //     console.log(INDENTATION + 'expect(' + ['action', startTime, endTime, term.toString()].join(', ') + ').\n');
                    // });
                    //
                    // console.log('expect_num_of(' + ['observation', startTime, endTime, profiler.get('lastCycleNumObservations')].join(', ') + ').\n');
                    // engine.getLastCycleObservations().forEach((termArg) => {
                    //     let lpsTerm = LPS.literal(termArg);
                    //     let args = lpsTerm.getArguments();
                    //     let term = new LPS.Functor(lpsTerm.getName(), args);
                    //     console.log(INDENTATION + 'expect(' + ['observation', startTime, endTime, term.toString()].join(', ') + ').\n');
                    // });

                    // console.log('expect_num_of(' + ['firedRules', endTime, profiler.get('lastCycleNumFiredRules')].join(', ') + ').\n');
                    // console.log('expect_num_of(' + ['resolvedGoals', endTime, profiler.get('lastCycleNumResolvedGoals')].join(', ') + ').\n');
                    // console.log('expect_num_of(' + ['unresolvedGoals', endTime, profiler.get('lastCycleNumUnresolvedGoals')].join(', ') + ').\n');
                    // console.log('expect_num_of(' + ['failedGoals', endTime, profiler.get('lastCycleNumFailedGoals')].join(', ') + ').\n');
                    //
                    // console.log('\n');

                });

                engine.on('error', (err) => {
                    console.log(err);
                });

                engine.run();
                console.log('engine finished running')
            }).catch((err) => {
                console.log('this is the error message: ' + err);
        });
    }

    window.TimeLine = TimeLine;

})(window);
