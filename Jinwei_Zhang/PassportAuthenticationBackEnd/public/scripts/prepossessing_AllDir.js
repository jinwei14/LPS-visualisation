// if (process.browser) {
//     window.LPS = LPS;
// }
(function (window) {
    console.log('index -> LPS(loadFile) -> ProgramFactory(fromFile) -> Parser(source, pathname) -> _lexer.get()');
    var program = '';
    var clearButtonPressed = false;
    /*
    * Event handling on the browser life cycle for parse the text file
    **/
    document.addEventListener("DOMContentLoaded", function () {
        function parserText(event) {
            //open up the content of the  visualiser
            program = document.getElementById("exampleFormControlTextarea1").value;
            if (program !== '' && program.trim().length !== 0) {
                var message = "<h6> Successfully passing LPS program to the parser ! </h6>";
                document.getElementById("output").innerHTML = message;
                // console.log(program);
                //make display text box appear
                var vis = document.getElementById("content");

                // //modify the program based the user input change in appManager.
                // newProgram = ProgramModifier(program);
                // //display the new program in the text box.
                // document.getElementById("exampleFormControlTextarea1").value = newProgram;
                //
                // //reset the button status to be false.
                // clearButtonPressed = false;
                // //run the new program in the LPS runner.
                // LPSRunner(newProgram, null);


                //reset the button status to be false.
                clearButtonPressed = false;
                //run the new program in the LPS runner.
                LPSRunner(program, null);


            } else {
                alert('Empty program detected via ' + event + ', Please input a program ');
            }
        }
        // change the button text after click
        // instead of using another selector API.
        document.querySelector("#AnimateButton").addEventListener("click", parserText);


    });

    /*
    * Event handling on stopping the LPS program.
    **/
    document.addEventListener("DOMContentLoaded", function () {
        //clear the content of the input box and disable the visualiser
        function stopRunning(event) {
            if (clearButtonPressed === false){clearButtonPressed = true;}


            var message = "<h6> Successfully stopped lps program ! </h6>";

            document.getElementById("output").innerHTML = message;

        }

        document.querySelector("#StopButton").addEventListener("click", stopRunning);
        // document.querySelector("#formControlFile1").addEventListener("click", clearText);
    });

    /*
    * Event handling on clearText and stop the running LPS program
    **/
    document.addEventListener("DOMContentLoaded", function () {
        //clear the content of the input box and disable the visualiser
        function clearText(event) {
            if (clearButtonPressed === false){clearButtonPressed = true;}

            document.getElementById("exampleFormControlTextarea1").value = "";
            console.log(document.getElementById("formControlFile1").value);
            console.log(document.getElementById("formControlFile1").files);
            document.getElementById("formControlFile1").value = null;
            document.getElementById("formControlFile1").files = null;

            var message = "<h6> Successfully cleared the lps program ! </h6>";

            document.getElementById("output").innerHTML = message;

            // if (vis.style.display === "block") {
            //     vis.style.display = "none";
            // }
            // appManager.clearContent();
            appManager.clearContent();
            tableManager.clearTable();
        }

        document.querySelector("#ClearButton").addEventListener("click", clearText);
        // document.querySelector("#formControlFile1").addEventListener("click", clearText);
    });

    /*
    * loading test button listener
    * */
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

                    var vis = document.getElementById("content");
                    if (vis.style.display === "none") {
                        vis.style.display = "block";
                    }
                    //clear the content before running the
                    // appManager.clearContent();
                    appManager.clearContent();
                    tableManager.clearTable();
                    appManager.createVisualizer();

                    LPSInitializer(contents, null);


                };

                r.readAsText(f);


            } else {
                alert("Failed to load file");
            }
        }

        document.querySelector('#formControlFile1').addEventListener("change", loadTextFromFile);
    });


    // /*
    // * Detect if the program is changed by user.
    // * */
    // document.addEventListener("DOMContentLoaded", function (){
    //     function programChanged(event) {
    //         console.log("program has been modified");
    //         appManager.clearContent();
    //         tableManager.clearTable();
    //         appManager.createVisualizer();
    //
    //         LPSInitializer(contents, null);
    //
    //     }
    //
    //     document.querySelector('#exampleFormControlTextarea1').addEventListener("keyup", programChanged);
    // });

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
        this.getObjectName = this.matchArray[1];

        // should be the fluent that changed such as : loc, location.
        this.getFluent = this.matchArray[0];


        //the heading is optional. If there is a heading then get the heading as the form of
        var regex = new RegExp('\\b' + 'dir' + '\\b');
        dirIndex = fullPhrase.search(regex);

        dir = fullPhrase.slice(dirIndex,fullPhrase.length-1);
        // console.log(dir);
        dirX = dir.slice(dir.indexOf('(')+1,dir.indexOf(','));
        dirY = dir.slice(dir.indexOf(',')+1,dir.indexOf(')'));
        // console.log(dirX,dirY);
        this.getHeading = [parseFloat(dirX),parseFloat(dirY)];



        //the x and y position of the car
        var regex1 = new RegExp('\\b' + 'coordinate' + '\\b');
        locationIndex = fullPhrase.search(regex1);

        locationStr = fullPhrase.slice(locationIndex,dirIndex);
        // console.log(location);
        XStr = locationStr.slice(locationStr.indexOf('(')+1,locationStr.indexOf(','));
        YStr = locationStr.slice(locationStr.indexOf(',')+1,locationStr.indexOf(')'));
        this.X = parseFloat(XStr);
        this.Y = parseFloat(YStr);
        // console.log(this.X, this.Y);

        this.writeOut = function () {
            return this.getFluent + '('
                + this.getObjectName
                + ',' + this.matchArray[2]
                + '('+ this.X.toString()+','+ this.Y.toString()+'),'
                + 'dir('+this.getHeading[0].toString()+','+ this.getHeading[1].toString()+ ')),'
        }
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
        this.X = parseInt(this.matchArray[3], 10);
        this.Y = parseInt(this.matchArray[4], 10);
        this.name = this.matchArray[1];


        //the width of the street
        this.width = parseInt(this.matchArray[5], 10);

        //the height of the street
        this.height = parseInt(this.matchArray[6], 10);

        //the number of lanes on the street
        this.no_lane = parseInt(this.matchArray[7], 10);

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

        this.fluent = this.matchArray[0];
        //the location and the name of the street
        this.X = parseInt(this.matchArray[2], 10);
        this.Y = parseInt(this.matchArray[3], 10);


        //the color of the traffic light
        this.color = this.matchArray[4];

        //the direction that the traffic light os facing
        this.direct = this.matchArray[5];

    }

    /*
    * this parser file is the parser for te animated cloud.
    * */
    function Cloud(fullPhrase) {

        //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
        this.fullPhrase = fullPhrase;

        //regulation match array
        this.matchArray = this.fullPhrase.match(/(\w+)/g);

        this.fluent = this.matchArray[0];
        //the location and the name of the street
        this.X = parseInt(this.matchArray[2], 10);
        this.Y = parseInt(this.matchArray[3], 10);

    }

    /*
    * This is the parser for the destination.
    * */
    function Destination(fullPhrase){
        //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
        this.fullPhrase = fullPhrase;

        //regulation match array
        this.matchArray = this.fullPhrase.match(/(\w+)/g);

        this.fluent = this.matchArray[0];

        this.vehicle = this.matchArray[1];
        //the location and the name of the street
        this.X = parseInt(this.matchArray[3], 10);
        this.Y = parseInt(this.matchArray[4], 10);

        this.destination = '(' + this.matchArray[3] +' , '+ this.matchArray[4] + ')';
    }

    // this parser file is the parser for the rotated road.
    function RotateRoad(fullPhrase) {

        //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
        this.fullPhrase = fullPhrase;

        //regulation match array
        this.matchArray = this.fullPhrase.match(/(\w+)/g);

        this.fluent = this.matchArray[0];
        this.name = this.matchArray[1];
        //the location and the name of the street
        this.X1 = parseInt(this.matchArray[3],10);
        this.Y1 = parseInt(this.matchArray[4],10);
        this.X2 = parseInt(this.matchArray[6],10);
        this.Y2 = parseInt(this.matchArray[7],10);
        this.X3 = parseInt(this.matchArray[9],10);
        this.Y3 = parseInt(this.matchArray[10],10);
        this.X4 = parseInt(this.matchArray[12],10);
        this.Y4 = parseInt(this.matchArray[13],10);

    }
    /**
     * this parser file is the parser for the roundabout
     * */
    function Roundabout(fullPhrase) {

        //the full phrase of the user defined fluent such as loc(car, 1650, 340)).
        this.fullPhrase = fullPhrase;

        //regulation match array
        this.matchArray = this.fullPhrase.match(/(\w+)/g);

        this.fluent = this.matchArray[0];
        this.name = this.matchArray[1];
        //the location and the name of the street
        this.X = parseInt(this.matchArray[3],10);
        this.Y = parseInt(this.matchArray[4],10);
        this.radius1 = parseInt(this.matchArray[5],10);
        this.radius2 = parseInt(this.matchArray[6],10);
        this.radius3 = parseInt(this.matchArray[7],10);

    }

    /*
   * this parser file is the parser for te testing the program. The program need to be modified before use hit
   * the running button.
   * */
    function ProgramModifier(program) {

        var arr = program.split("\n");
        // keep a start index of initially block
        var start = 0;

        while (!arr[start].trim().startsWith('initially')) {
            start += 1;
        }

        // keep a end index of initially block
        var end = start;

        while (!arr[end].trim().startsWith(']).')) {
            end += 1;
        }

        console.log(start, end);
        var found = false;
        //a set  of cars which is in user text input
        var carSetProgram = new Set();
        //a set  of cars which is modified after canvas was showed.
        var carSetManager = {};
        appManager.vehicle.forEach(function (item) {
            carSetManager[item.name] = item
        });

        //loop through the initial text block and change the car location and state. (deletion and modification)
        for (i = end; i > start; i--) {
            //if we find a line like moving(car2)
            if (arr[i].trim().startsWith('moving') || arr[i].trim().startsWith('stopped')) {
                console.log(arr[i]);
                found = false;
                var matchArray1 = arr[i].match(/(\w+)/g);
                carName = matchArray1[1];

                // if we do find a same car in the manager
                console.log(carName);
                if (carName in carSetManager){
                    carSetProgram.add(carName);

                }else{
                    arr.splice(i, 1);
                }

                // arr.splice(i, 1);
            } else if (arr[i].trim().startsWith('location')) {
                console.log(arr[i]);
                found = false;
                var loc = new VehicleLoc(arr[i].trim(), 0);

                // if we do find a same car in the manager
                    if( loc.getObjectName in carSetManager){
                        //found is true meaning there is the same car in the appManager only need to do modification to location
                        loc.X = carSetManager[loc.getObjectName].obj.x;
                        loc.Y = carSetManager[loc.getObjectName].obj.y;
                        loc.getHeading = carSetManager[loc.getObjectName].direction;
                        arr[i] = loc.writeOut();
                    }else{
                        //   did not find car2 in the appManger (it has been deleted by the user) remove the moving line
                        arr.splice(i, 1);
                    }
            }
        }

        console.log(carSetProgram);
        console.log(carSetManager);
        //loop through the appManager check if there is added car then give a random goal just for fun right now
        appManager.vehicle.forEach(function (item,index) {
            //if the program set do not contain some car in the manager set then we should insert the new car into the program
            if(!carSetProgram.has(item.name)){
                arr.splice(start+1,0,'moving('+item.name+'),');
                arr.splice(start+2,0,'location('+item.name+', coordinate('+item.obj.x.toString()+','+item.obj.y.toString()+'),'+item.direction+'),');
                switch (item.direction) {
                    case 'northward':
                        arr.splice(start+3,0,'goal('+item.name+', coordinate('+item.obj.x.toString()+','+(item.obj.y-100).toString()+')),');
                        break;
                    case 'southward':
                        arr.splice(start+3,0,'goal('+item.name+', coordinate('+item.obj.x.toString()+','+(item.obj.y+100).toString()+')),');
                        break;
                    case 'westward':
                        arr.splice(start+3,0,'goal('+item.name+', coordinate('+(item.obj.x-100).toString()+','+item.obj.y.toString()+')),');
                        break;
                    case 'eastward':
                        arr.splice(start+3,0,'goal('+item.name+', coordinate('+(item.obj.x+100).toString()+','+item.obj.y.toString()+')),');
                        break;
                    default:
                        console.log(err);
                        alert('direction wrong');

                }

            }
        });

        return arr.join("\n");
    }

    /*
    * This function will be called when the animate button is clicked.
    * */
    function LPSRunner(programFile, specFile) {

        LPS.loadString(programFile)
            .then((engine) => {
                let profiler = engine.getProfiler();
                //start creating the pixiJS panel
                // appManager.createVisualizer();
                engine.on('postCycle', () => {
                    let currentTime = engine.getCurrentTime();
                    let fluents = engine.getActiveFluents();
                    let actions = engine.getLastCycleActions();
                    let observations = engine.getLastCycleObservations();
                    //get all the fact other wise needs to define all the fact as fluents
                    let facts = engine.getTimelessFacts();

                    let duration = profiler.get('lastCycleExecutionTime');
                    // if (currentTime === 1) {
                    //     console.log(facts);
                    //     facts.forEach(function (item, index) {
                    //         if (item.toLowerCase().startsWith('street')) {
                    //             //street(mainStreet, coordinate(100, 200), 900, 50, 1)).
                    //             var street = new Streets(item);
                    //             appManager.createRoad(street.name, street.X, street.Y, street.width, street.height, street.no_lane);
                    //
                    //         } else if (item.toLowerCase().startsWith('cloud')) {
                    //             var cloud = new Cloud(item);
                    //             appManager.createCloud(cloud.X, cloud.Y);
                    //         }
                    //     });
                    //     fluents.forEach(function (item, index) {
                    //         if (item.toLowerCase().startsWith('location')) {
                    //             // initialise the location of the car.
                    //             var loc = new VehicleLoc(item, currentTime);
                    //             appManager.createVehicle(loc.getObjectName(), loc.X, loc.Y, loc.getHeading());
                    //         } else if (item.toLowerCase().startsWith('trafficlight')) {
                    //             //  check if the traffic light has been initialised
                    //
                    //             var light = new TrafficLight(item);
                    //             appManager.createTrafficLight(light.X, light.Y, light.color);
                    //         }
                    //     });
                    //     //Do something
                    // } else

                    if (currentTime > 1) {
                        console.log(currentTime);
                        console.log(fluents);
                        fluents.forEach(function (item, index) {
                            if (item.toLowerCase().startsWith('location')) {
                                console.log(item);
                                var loc = new VehicleLoc(item, currentTime);
                                console.log(loc.getObjectName, loc.X, loc.Y, loc.getHeading);
                                appManager.changeVehicleLocation(loc.getObjectName, loc.X, loc.Y, loc.getHeading);
                            } else if (item.toLowerCase().startsWith('trafficlight')) {
                                // console.log(item);
                                var light = new TrafficLight(item);
                                appManager.changeTrafficLight(light.X, light.Y, light.color);

                            }
                        });

                        if (observations !== undefined && observations.length !== 0){
                            console.log(observations);
                            let matchArray = observations[0].match(/(\w+)/g);
                            if (matchArray[0].toLowerCase() === 'placeblockingitem'){
                                appManager.createBlockItem(matchArray[3],matchArray[4],matchArray[1]);
                            }
                        }


                    }

                    // judge when should the program be stopped. then reset the  clearButtonPressed to be false again.
                    if(clearButtonPressed === true){
                        console.log('current time: '+ engine.getCurrentTime() + ' LPS program has been stopped');
                        engine.halt();
                        clearButtonPressed = false;

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

    /*
    * init the street cloud and the vehicles
    * */
    function LPSInitializer(programFile, specFile) {

        LPS.loadString(programFile)
            .then((engine) => {

                let currentTime = engine.getCurrentTime();
                let fluents = engine.getActiveFluents();
                //get all the fact other wise needs to define all the fact as fluents
                let facts = engine.getTimelessFacts();

                facts.forEach(function (item, index) {
                    if (item.toLowerCase().startsWith('street')) {
                        //street(mainStreet, coordinate(100, 200), 900, 50, 1)).
                        var street = new Streets(item);
                        appManager.createRoad(street.name, street.X, street.Y, street.width, street.height, street.no_lane);

                    } else if (item.toLowerCase().startsWith('cloud')) {
                        var cloud = new Cloud(item);
                        appManager.createCloud(cloud.X, cloud.Y);
                    } else if (item.toLowerCase().startsWith('rotatestreet')) {
                        var rotateStreet = new RotateRoad(item);
                        appManager.createRotateRoad(rotateStreet.X1, rotateStreet.Y1,
                            rotateStreet.X2,rotateStreet.Y2,
                            rotateStreet.X3,rotateStreet.Y3,
                            rotateStreet.X4,rotateStreet.Y4);
                    }else if (item.toLowerCase().startsWith('roundabout')) {
                        var roundabout = new Roundabout(item);
                        appManager.createRoundabout(roundabout.X,roundabout.Y,roundabout.radius1,roundabout.radius2,roundabout.radius3);
                    }
                });

                fluents.forEach(function (item, index) {
                    if (item.toLowerCase().startsWith('location')) {
                        // initialise the location of the car.
                        var loc = new VehicleLoc(item, currentTime);
                        appManager.createVehicle(loc.getObjectName, loc.X, loc.Y, loc.getHeading);
                    } else if (item.toLowerCase().startsWith('trafficlight')) {
                        //  check if the traffic light has been initialised
                        var light = new TrafficLight(item);
                        appManager.createTrafficLight(light.X, light.Y, light.color);
                    }else if (item.toLowerCase().startsWith('goal')){

                        var goal = new Destination(item);
                        tableManager.createTable(goal.vehicle, goal.destination);
                        appManager.addGoal(goal.vehicle,goal.X,goal.Y);
                    }
                });


            }).catch((err) => {

            //clear the content if there is any error.
            appManager.clearContent();
            console.log('this is the error message: ' + err);
            alert("Error in running the program: " + err);
        });
    }


})(window);
