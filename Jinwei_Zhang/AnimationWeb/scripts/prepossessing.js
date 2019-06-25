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
                //clear the content before running the
                appManager.clearContent();
                LPSRunner(program, null);


            } else {
                alert('Empty program detected via ' + event + ', Please input a program ');
            }
        }

        //clear the content of the input box and disable the visualiser
        function clearText(event) {

            document.getElementById("exampleFormControlTextarea1").value = "";
            console.log(document.getElementById("formControlFile1").value);
            console.log(document.getElementById("formControlFile1").files);
            document.getElementById("formControlFile1").value = null;
            document.getElementById("formControlFile1").files = null;

            var message = "<h6> Successfully cleared the lps program ! </h6>";

            document.getElementById("output").innerHTML = message;
            var vis = document.getElementById("content");
            // if (vis.style.display === "block") {
            //     vis.style.display = "none";
            // }
            // appManager.clearContent();
        }

        // change the button text after click
        // instead of using another selector API.
        document.querySelector("#AnimateButton").addEventListener("click", parserText);
        document.querySelector("#ClearButton").addEventListener("click", clearText);
        // document.querySelector("#formControlFile1").addEventListener("click", clearText);

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

    /*
    this is the data structure for parse the vehicle location from
    the initial fluent to the  change of the state
    */

    function VehicleLoc(fullPhrase, timeStamp) {
        //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
        this.fullPhrase = fullPhrase;

        //the time stamp that this fluent changed
        this.timeStamp = timeStamp;

        //regulation match array
        this.matchArray = this.fullPhrase.match(/(\w+)/g);


        //the object that is changing such as Car , Truck etx
        this.getObjectName = function () {
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

        this.X = parseInt(this.getPosition()[0], 10);
        this.Y = parseInt(this.getPosition()[1], 10);

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

    /*
    * this is the data structure for parse the street information Mentioned that
    * this will only be call when cycle is 1.
    * */
    function Streets(fullPhrase) {

        //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
        this.fullPhrase = fullPhrase;

        //regulation match array
        this.matchArray = this.fullPhrase.match(/(\w+)/g);

        this.fluent = this.matchArray[0];

        //the location and the name of the street
        this.X = parseInt(this.matchArray[3],10);
        this.Y = parseInt(this.matchArray[4],10);
        this.name = this.matchArray[1];


        //the width of the street
        this.width = parseInt(this.matchArray[5],10);

        //the height of the street
        this.height = parseInt(this.matchArray[6],10);

        //the number of lanes on the street
        this.no_lane = parseInt(this.matchArray[7],10);

    }

    /*
    * this is the data structure for parse the traffic light information. Mentioned that
    * this will only be call when cycle is 1 and updated on each cycle.
    * */
    function TrafficLight(fullPhrase) {

        //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
        this.fullPhrase = fullPhrase;

        //regulation match array
        this.matchArray = this.fullPhrase.match(/(\w+)/g);
        console.log(this.matchArray);

        this.fluent = this.matchArray[0];
        //the location and the name of the street
        this.X = parseInt(this.matchArray[2],10);
        this.Y = parseInt(this.matchArray[3],10);


        //the color of the traffic light
        this.color = this.matchArray[4];

        //the direction that the traffic light os facing
        this.direct = this.matchArray[5];

    }


    // this parser file is the parser for te animated cloud.
    function Cloud(fullPhrase) {

        //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
        this.fullPhrase = fullPhrase;

        //regulation match array
        this.matchArray = this.fullPhrase.match(/(\w+)/g);
        console.log(this.matchArray);

        this.fluent = this.matchArray[0];
        //the location and the name of the street
        this.X = parseInt(this.matchArray[2],10);
        this.Y = parseInt(this.matchArray[3],10);

    }

    /*
    * This function will be called when the animate button is clicked.
    * */
    function LPSRunner(programFile, specFile) {


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
                    //get all the fact other wise needs to define all the fact as fluents
                    let facts = engine.getTimelessFacts();

                    let duration = profiler.get('lastCycleExecutionTime');
                    if (currentTime === 1) {
                        console.log(facts);
                        facts.forEach(function (item, index) {
                            if (item.toLowerCase().startsWith('street')) {
                                //street(mainStreet, coordinate(100, 200), 900, 50, 1)).
                                var street = new Streets(item);
                                appManager.createRoad(street.name, street.X, street.Y, street.width, street.height, street.no_lane);

                            }else if (item.toLowerCase().startsWith('cloud')){
                                var cloud = new Cloud(item);
                                appManager.createClound(cloud.X,cloud.Y);
                            }
                        });
                        fluents.forEach(function (item, index) {
                             if (item.toLowerCase().startsWith('location')) {
                                // initialise the location of the car.
                                var loc = new VehicleLoc(item, currentTime);
                                appManager.createVehicle(loc.getObjectName(), loc.X, loc.Y, loc.getHeading());
                            }else if (item.toLowerCase().startsWith('trafficlight')){
                                 //    need to implement a function to create traffic light.
                                 var light = new TrafficLight(item);
                                 appManager.createTrafficLight(light.X,light.Y,light.color);
                             }
                        });
                        //Do something
                    } else if (currentTime > 1) {
                        console.log(currentTime);
                        fluents.forEach(function (item, index) {
                            if (item.toLowerCase().startsWith('location')) {
                                console.log(item);
                                var loc = new VehicleLoc(item, currentTime);
                                appManager.changeVehicleLocation(loc.getObjectName(), loc.X, loc.Y, loc.getHeading());
                            }
                        });
                    }
                });

                engine.on('error', (err) => {
                    console.log(err);
                    //clear the content if there is any error.
                    appManager.clearContent();
                    alert("Error in running the engine: " + err);
                });

                engine.run();
                console.log('engine finished running');
            }).catch((err) => {

            //clear the content if there is any error.
            appManager.clearContent();
            console.log('this is the error message: ' + err);
            alert("Error in running the program: " + err);
        });
    }


})(window);
