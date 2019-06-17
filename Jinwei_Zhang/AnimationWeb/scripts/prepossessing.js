// if (process.browser) {
//     window.LPS = LPS;
// }
(function (window) {
    console.log('index -> LPS(loadFile) -> ProgramFactory(fromFile) -> Parser(source, pathname) -> _lexer.get()');
    var program = '';

    // Event handling on the broswer life clcle for parse the text file
    document.addEventListener("DOMContentLoaded", function () {
        function parserText(event) {
            //open up the content of the  visualiser
            program = document.getElementById("exampleFormControlTextarea1").value;
            if (program !== '' && program.trim().length !== 0) {
                var message = "<h6> Successfully passing LPS program to the parser ! </h6>";
                document.getElementById("output").innerHTML = message;
                console.log(program);
                //make display text box appear
                var vis = document.getElementById("content");
                if (vis.style.display === "none") {
                    vis.style.display = "block";
                }

                generateSpec(program, null);


            } else {
                alert('Empty program detected via ' + event + ', Please input a program ');
            }
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

        // change the button text after click
        // instead of using another selector API.
        document.querySelector("#AnimateButton").addEventListener("click", parserText);
        document.querySelector("#ClearButton").addEventListener("click", clearText);


    });

    //loading test button listener
    document.addEventListener("DOMContentLoaded", function () {
        function loadTextFromFile(evt) {
            //Retrieve the first (and only!) File from the FileList object
            var f = evt.target.files[0];

            if (f) {
                var r = new FileReader();
                r.onload = function (e) {
                    var contents = e.target.result;
                    // alert( "name: " + f.name
                    // +" size: " + f.size
                    // + "starts with: " + contents.substr(1, contents.indexOf("n")));
                    console.log(contents);
                    document.getElementById("exampleFormControlTextarea1").value = contents;
                };

                r.readAsText(f);

            } else {
                alert("Failed to load file");
            }
        }

        document.querySelector('#formControlFile1').addEventListener("change", loadTextFromFile);
    });

    /* 1.we leave the file system for now for start up
       2. Read all the information into a dictionary
       3. start the animation process dump the buggy lps studio.
    */

    // this the object that need to be process at every time cycle
    function ObjectLoc(fullPhrase, timeStamp) {

        //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
        // // location(yourCar, coordinate(9, 9), eastward)
        this.fullPhrase = fullPhrase;

        //the time stamp that this fluent changed
        this.timeStamp = timeStamp;

        //regulation match array of word and numbers
        this.matchArray = this.fullPhrase.match(/(\w+)/g);

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

    function generateSpec(programFile, specFile) {


        LPS.loadString(programFile)
            .then((engine) => {
                let profiler = engine.getProfiler();
                //start creating the pixiJS panel
                appManager.createVisualizer();
                engine.on('postCycle', () => {
                    let currentTime = engine.getCurrentTime();
                    let fluents = engine.getActiveFluents();
                    let actions = engine.getLastCycleActions();
                    let observations = engine.getLastCycleObservations();
                    let duration = profiler.get('lastCycleExecutionTime');
                    if (currentTime === 1) {
                        fluents.forEach(function (item, index) {
                            if (item.toLowerCase().startsWith('street')) {
                                //street(mainStreet, coordinate(100, 200), 900, 50, 1)).
                                appManager.createRoad('mainStreet',100,200,900,50,1);

                            } else if (item.toLowerCase().startsWith('location')) {
                                appManager.createVehicle('haha',120,225,'eastward')
                            }
                        });
                        //Do something
                    }else if (currentTime > 1){
                        fluents.forEach(function (item, index) {
                        if (item.toLowerCase().startsWith('location')) {
                            appManager.changeVehicleLocation('haha',200,225,'eastward')
                        }
                        });
                    }
                });

                engine.on('error', (err) => {
                    console.log(err);
                    alert("Error in running the program: " + err);
                });

                engine.run();
                console.log('engine finished running');
            }).catch((err) => {
            console.log('this is the error message: ' + err);
            alert("Error in running the program: " + err);
        });
    }


})(window);
