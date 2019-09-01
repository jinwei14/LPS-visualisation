// this parser file is the parser for te testing the program.
resAll = [];
function ProgramModifier(program){

    var arr = program.split("\n");

    var start = 0;

    while(!arr[start].trim().startsWith('initially')){start += 1;}

    var end = start;

    while(!arr[end].trim().startsWith(']).')){end +=1;}

    console.log(start,end);

    for(i=end; i>start; i--){
        if (arr[i].trim().startsWith('moving')){
            // console.log(arr[i]);
            var matchArray = arr[i].match(/(\w+)/g);
            console.log(matchArray);
            resAll.push(matchArray);
            arr.splice(i, 1);
        }

        if (arr[i].trim().startsWith('location')){
            // console.log(arr[i]);
            var matchArray = arr[i].match(/(\w+)/g);
            console.log(matchArray);
            resAll.push(matchArray);
            arr.splice(i, 1);
        }
    }
    return arr.join("\n");
}


program = "% LPS visualisation for self-driving car\n" +
    "% Define street as: street(StreetName, coordinate(X, Y), Width, Height, Number_of_lane) eg: street(piccadillyRoad, coordinate(9, 9), 80, 70, 2)\n" +
    "% Define location of car as location(Name_of_car, coordinate(X, Y), Direction) eg: location(yourCar, coordinate(9, 9), eastward)\n" +
    "% Define traffic light as trafficLight(coordinate(X, Y), Working_status, Color, FacingDirection) eg: trafficLight(coordinate(2, 2), on, Red, eastward)\n" +
    "\n" +
    "% we assume the destination is reachable\n" +
    "% and car length is 40 x 40 based on the image\n" +
    "% speed is 5 unit per cycle.\n" +
    "maxTime(200).\n" +
    "cycleInterval(50).\n" +
    "\n" +
    "loadModule('../scripts/module.js').\n" +
    "\n" +
    "fluents([\n" +
    "  stopped(VehicleName),\n" +
    "  moving(VehicleName),\n" +
    "  coordinate(X, Y),\n" +
    "  location(VehicleName, coordinate(X, Y), Direction),\n" +
    "  trafficLight(coordinate(X, Y), Color, FacingDirection,Street),\n" +
    "  street(StreetName, coordinate(X, Y), Width, Height, Number_of_lane, Priority),\n" +
    "  goal(VehicleName,coordinate(X, Y))\n" +
    "\n" +
    "]).\n" +
    "\n" +
    "% events will reserved for traffic lights\n" +
    "events ([\n" +
    "\n" +
    "]).\n" +
    "\n" +
    "actions ([\n" +
    "  step(Vehicle, NextPlace),\n" +
    "  turn(Vehicle, NewHeading),\n" +
    "  arrive(Vehicle),\n" +
    "  changeTrafficLight(Place,Color)\n" +
    "]).\n" +
    "\n" +
    "initially([\n" +
    "  moving(car0),\n" +
    "  moving(car1),\n" +
    "  moving(car2),\n" +
    " %  normal start one on the mainstreet and other on the southStreet\n" +
    " % carA wants to go straight from mainStreet, carB want to turn left from southStreet\n" +
    "  location(car0, coordinate(145, 475), eastward),\n" +
    "  location(car1, coordinate(475, 880), northward),\n" +
    "  location(car2,coordinate(700,525),westward),\n" +
    "  goal(car0,coordinate(980, 475)),\n" +
    "  goal(car1,coordinate(120, 525)),\n" +
    "  goal(car2,coordinate(120, 525)),\n" +
    "\n" +
    "  % % %  carA start from Tjunction\n" +
    "  %  %  % normal start one on the mainstreet and other on the southStreet\n" +
    "  %  % carA wants to go straight from mainStreet, carB want to turn left from southStreet\n" +
    "  % location(carA, coordinate(500, 175), eastward),\n" +
    "  % location(carB, coordinate(500 ,300), northward),\n" +
    "  % goal(carA,coordinate(980, 175)),\n" +
    "  % goal(carB,coordinate(120, 225)),\n" +
    "\n" +
    "  % % %carA carB start driving to a same goal straightly\n" +
    "  %   location(carA, coordinate(145, 175), eastward),\n" +
    "  %   location(carB, coordinate(200, 175), eastward),\n" +
    "  %   goal(carA,coordinate(980, 225)),\n" +
    "  %   goal(carB,coordinate(980, 225)),\n" +
    "\n" +
    "\n" +
    "  % % %carA carB start driving to a same goal both turnnig into southStreet\n" +
    "  %   location(carA, coordinate(145, 175), eastward),\n" +
    "  %   location(carB, coordinate(200, 175), eastward),\n" +
    "  %   goal(carA,coordinate(500, 580)),\n" +
    "  %   goal(carB,coordinate(500, 580)),\n" +
    "\n" +
    "\n" +
    "% %carB turn left from southStreet, carA turn right from mainStreet\n" +
    "%   location(carA, coordinate(145, 175), eastward),\n" +
    "%   location(carB, coordinate(500, 580), northward),\n" +
    "%   goal(carA,coordinate(500, 580)),\n" +
    "%   goal(carB,coordinate(145, 225)),\n" +
    "\n" +
    "\n" +
    "\n" +
    "  % % carA carB drivr opposite to each other\n" +
    "  %   location(carA, coordinate(450, 175), eastward),\n" +
    "  %   location(carB, coordinate(980 ,225), westward),\n" +
    "  %   goal(carA,coordinate(980, 175)),\n" +
    "  %   goal(carB,coordinate(145, 225)),\n" +
    "\n" +
    "  % the position that the car might step on, a traffic light is defined here for further instructions.\n" +
    "  trafficLight(coordinate(430, 475), red, westward, mainStreet),\n" +
    "  trafficLight(coordinate(575, 525), red, eastward, mainStreet),\n" +
    "  trafficLight(coordinate(475, 570), green, southward, southStreet),\n" +
    "  trafficLight(coordinate(525, 430), green, northward, northStreet)\n" +
    "\n" +
    "]).\n" +
    "\n" +
    "% define the junction coordinate facts\n" +
    "% junction(Name,coordinate(A, B),coordinate(C, D),coordinate(E, F),coordinate(G, H))\n" +
    "junction(tJuntion1,coordinate(450, 450),coordinate(500, 450),coordinate(450, 500),coordinate(500, 500)).\n" +
    "junction(tJuntion2,coordinate(500, 450),coordinate(550, 450),coordinate(500, 500),coordinate(550, 500)).\n" +
    "junction(tJuntion3,coordinate(450, 500),coordinate(500, 500),coordinate(450, 550),coordinate(500, 550)).\n" +
    "junction(tJuntion4,coordinate(500, 500),coordinate(550, 500),coordinate(500, 550),coordinate(550, 550)).\n" +
    "\n" +
    "\n" +
    "% define the street coordinate facts.\n" +
    "street(northStreet , coordinate(450, 150), 50, 300, 2,0).\n" +
    "\n" +
    "street(northStreet , coordinate(500, 150), 50, 300, 2,0).\n" +
    "\n" +
    "street(mainStreet , coordinate(100, 450), 900, 50, 2,1).\n" +
    "\n" +
    "street(mainStreet , coordinate(100, 500), 900, 50, 2,1).\n" +
    "\n" +
    "street(southStreet , coordinate(450, 550), 50, 400, 2,0).\n" +
    "\n" +
    "street(southStreet , coordinate(500, 550), 50, 400, 2,0).\n" +
    "\n" +
    "cloud(coordinate(140,100)).\n" +
    "cloud(coordinate(250,90)).\n" +
    "cloud(coordinate(300,120)).\n" +
    "\n" +
    "cloud(coordinate(640,100)).\n" +
    "cloud(coordinate(750,90)).\n" +
    "cloud(coordinate(800,120)).\n" +
    "% atTjunction(coordinate(A,B),junction(tJuntion1,coordinate(A1, A2),coordinate(B1, B2),coordinate(C1, C2),coordinate(D1, D2))) <-\n" +
    "%   X1==475,Y1==200,X2 == 525, Y2 == 200, X3==.\n" +
    "% atTjunction(tJuntion2,coordinate(475, 150),coordinate(525, 150),coordinate(475, 200),coordinate(525, 200)) <-\n" +
    "%   Xu==475,Yu==200,Xd == 9, Yd == 9.\n" +
    "\n" +
    "% ---------------------------------Reactive rules---------------------------------------------\n" +
    "trafficLight(coordinate(X, Y), Color, FacingDirection,Street) at T->\n" +
    "  opposite(Color,Color2),\n" +
    "  Reminder = mod(T,40),\n" +
    "  Reminder == 0,\n" +
    "  changeTrafficLight(coordinate(X, Y),Color2) at T.\n" +
    "\n" +
    "\n" +
    "goal(Vehicle,coordinate(A, B)) from _ to T,\n" +
    "location(Vehicle, coordinate(X, Y), Direction), A==X, B==Y,moving(Vehicle) at T ->\n" +
    "  % testPrint(Vehicle+ ' we have arrived'),\n" +
    "  arrive(Vehicle) at T.\n" +
    "\n" +
    "\n" +
    "goal(Vehicle,coordinate(A, B)) from _ to T,\n" +
    "location(Vehicle, coordinate(X, Y), Direction),\n" +
    "  moving(Vehicle) at T ->\n" +
    "    % need to find the right direction here\n" +
    "    % driving forward\n" +
    "    % testPrint(Vehicle+' '+X+' '+Y+' Direction '+Direction + '----------------Reactive rule----------------'),\n" +
    "    direction(Vehicle) at T.\n" +
    "\n" +
    "\n" +
    "goal(Vehicle,coordinate(A, B)) from T to T1,\n" +
    "location(Vehicle, coordinate(X, Y), Direction),\n" +
    "  moving(Vehicle) at T1 ->\n" +
    "\n" +
    "    % testPrint(Vehicle + \" start driving\"),\n" +
    "    drive(Vehicle) from T1 to _.\n" +
    "\n" +
    "\n" +
    "% ---------------------------------------------------------------------------------------------\n" +
    "% the case where car is not at t junction.\n" +
    "direction(Vehicle) at T<-\n" +
    "  % testPrint('checking in Juntion or not ?'),\n" +
    "  location(Vehicle, coordinate(X, Y), _) at T,\n" +
    "  junction(tJuntion1,coordinate(A1, B1),coordinate(C1, D1),coordinate(E1, F1),coordinate(G1, H1)),\n" +
    "  junction(tJuntion2,coordinate(A2, B2),coordinate(C2, D2),coordinate(E2, F2),coordinate(G2, H2)),\n" +
    "  junction(tJuntion3,coordinate(A3, B3),coordinate(C3, D3),coordinate(E3, F3),coordinate(G3, H3)),\n" +
    "  junction(tJuntion4,coordinate(A4, B4),coordinate(C4, D4),coordinate(E4, F4),coordinate(G4, H4)),\n" +
    "  notAtTjunction(X,Y,A1,B1,C1,D1,E1,F1),\n" +
    "  notAtTjunction(X,Y,A2,B2,C2,D2,E2,F2),\n" +
    "  notAtTjunction(X,Y,A3,B3,C3,D3,E3,F3),\n" +
    "  notAtTjunction(X,Y,A4,B4,C4,D4,E4,F4).\n" +
    "\n" +
    "\n" +
    "\n" +
    "notAtTjunction(X,Y,A,B,C,D,E,F)<-\n" +
    "  Y != (B+F)/2.\n" +
    "notAtTjunction(X,Y,A,B,C,D,E,F)<-\n" +
    "  X != (A+C)/2.\n" +
    "\n" +
    "\n" +
    "% you only turn when you are in the middle of the juction.\n" +
    "direction(Vehicle) at T<-\n" +
    "  % testPrint('checking in turnning westward or not ?'),\n" +
    "  location(Vehicle, coordinate(X, Y), Direction),\n" +
    "  goal(Vehicle,coordinate(K, P)),\n" +
    "  % junction(tJuntion,coordinate(A, B),coordinate(C, D),coordinate(E, F),coordinate(G, H)),\n" +
    "  % X == (A+C)/2,\n" +
    "  % Y == (B+F)/2,\n" +
    "  P == Y,\n" +
    "  K < X,\n" +
    "  % testPrint(Vehicle +' turing westward'),\n" +
    "  turn(Vehicle,westward) at T.\n" +
    "\n" +
    "direction(Vehicle) at T<-\n" +
    "  % testPrint('checking in turnning eastward or not ?'),\n" +
    "  location(Vehicle, coordinate(X, Y), Direction),\n" +
    "  goal(Vehicle,coordinate(K, P)),\n" +
    "  % junction(tJuntion,coordinate(A, B),coordinate(C, D),coordinate(E, F),coordinate(G, H)),\n" +
    "  % X == (A+C)/2,\n" +
    "  % Y == (B+F)/2,\n" +
    "  P == Y,\n" +
    "  K > X,\n" +
    "  % testPrint(Vehicle +' turing eastward'),\n" +
    "  turn(Vehicle, eastward) at T.\n" +
    "\n" +
    "direction(Vehicle) at T<-\n" +
    "  % testPrint('checking in turnning northward or not ?'),\n" +
    "  location(Vehicle, coordinate(X, Y), Direction),\n" +
    "  goal(Vehicle,coordinate(K, P)),\n" +
    "  % junction(tJuntion,coordinate(A, B),coordinate(C, D),coordinate(E, F),coordinate(G, H)),\n" +
    "  % X == (A+C)/2,\n" +
    "  % Y == (B+F)/2,\n" +
    "  K == X,\n" +
    "  P < Y,\n" +
    "  % testPrint(Vehicle +' turing northward'),\n" +
    "  turn(Vehicle,northward) at T.\n" +
    "\n" +
    "direction(Vehicle) at T<-\n" +
    "  location(Vehicle, coordinate(X, Y), Direction),\n" +
    "  goal(Vehicle,coordinate(K, P)),\n" +
    "  % junction(tJuntion,coordinate(A, B),coordinate(C, D),coordinate(E, F),coordinate(G, H)),\n" +
    "  % X == (A+C)/2,\n" +
    "  % Y == (B+F)/2,\n" +
    "  K == X,\n" +
    "  P > Y,\n" +
    "  % testPrint('checking in turnning or not ?'),\n" +
    "  % testPrint(Vehicle +' turing southward'),\n" +
    "  turn(Vehicle,southward) at T.\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "% ---------------------------------------------------------------------------------------------\n" +
    "\n" +
    "\n" +
    "% drive macro event.\n" +
    "drive(Vehicle) from T to T1 <-\n" +
    "  location(Vehicle, coordinate(X, Y), Direction),\n" +
    "  Direction == northward,\n" +
    "  NewY = Y - 5,\n" +
    "  NextPlace = coordinate(X, NewY),\n" +
    "  % testPrint(Vehicle+ ' move northward'),\n" +
    "  step(Vehicle, NextPlace) at T1.\n" +
    "\n" +
    "drive(Vehicle) from T to T1 <-\n" +
    "  location(Vehicle, coordinate(X, Y), Direction),\n" +
    "  Direction == southward,\n" +
    "  NewY = Y + 5,\n" +
    "  NextPlace = coordinate(X, NewY),\n" +
    "  % testPrint(Vehicle+ ' move southward'),\n" +
    "  step(Vehicle, NextPlace) at T1.\n" +
    "\n" +
    "drive(Vehicle) from T to T1 <-\n" +
    "  location(Vehicle, coordinate(X, Y), Direction),\n" +
    "  Direction == westward,\n" +
    "  NewX = X-5,\n" +
    "  NextPlace = coordinate(NewX, Y),\n" +
    "  % testPrint(Vehicle+ ' move westward'),\n" +
    "  step(Vehicle, NextPlace) at T1.\n" +
    "\n" +
    "drive(Vehicle) from T to T1 <-\n" +
    "  location(Vehicle, coordinate(X, Y), Direction),\n" +
    "  Direction == eastward,\n" +
    "  NewX = X + 5,\n" +
    "  NextPlace = coordinate(NewX, Y),\n" +
    "  % testPrint(Vehicle+ ' move eastward'),\n" +
    "  step(Vehicle, NextPlace) at T1.\n" +
    "\n" +
    "% ---------------------------------------------------------------------------------------------\n" +
    "%step is false if the car is moving into a junction, not on main Road and there is a collision.\n" +
    "% this part need further developemnt for other cases\n" +
    "% you can not step forward if there is a trafficLight at your postion\n" +
    "% and the traffic light is red.\n" +
    "<- step(Vehicle, NextPlace),\n" +
    "  location(Vehicle, coordinate(X, Y), Direction1),\n" +
    "  trafficLight(coordinate(A, B), red, Direction2, Street),\n" +
    "  X==A,\n" +
    "  Y==B.\n" +
    "\n" +
    "\n" +
    "\n" +
    "% this is also not perfect need further development\n" +
    "<- step(Vehicle, NextPlace),\n" +
    "  collisionPossible(Vehicle, Vehicle2) at T,\n" +
    "  stopped(Vehicle2).\n" +
    "\n" +
    "% case where car should not step forward is that your goal is on your left but you are facing in a wrong direction\n" +
    "<- step(Vehicle, NextPlace),\n" +
    "  location(Vehicle, coordinate(A, B), Direction),\n" +
    "  % street(_, coordinate(A, B), Width, Height, _, _),\n" +
    "  goal(Vehicle,coordinate(C, D)),\n" +
    "  A == C,\n" +
    "  D < B,\n" +
    "  Direction != northward.\n" +
    "\n" +
    "% this bit need furter improvement.\n" +
    "<- step(Vehicle, NextPlace),\n" +
    "  location(Vehicle, coordinate(A, B), Direction),\n" +
    "  % street(_, coordinate(A, B), Width, Height, _, _),\n" +
    "  goal(Vehicle,coordinate(C, D)),\n" +
    "  A == C,\n" +
    "  D > B,\n" +
    "  Direction != southward.\n" +
    "\n" +
    "<- step(Vehicle, NextPlace),\n" +
    "  location(Vehicle, coordinate(A, B), Direction),\n" +
    "  % street(_, coordinate(A, B), Width, Height, _, _),\n" +
    "  goal(Vehicle,coordinate(C, D)),\n" +
    "  D == B,\n" +
    "  C < A,\n" +
    "  Direction != westward.\n" +
    "\n" +
    "<- step(Vehicle, NextPlace),\n" +
    "  location(Vehicle, coordinate(A, B), Direction),\n" +
    "  % street(_, coordinate(A, B), Width, Height, _, _),\n" +
    "  goal(Vehicle,coordinate(C, D)),\n" +
    "  D == B,\n" +
    "  C > A,\n" +
    "  Direction != eastward.\n" +
    "\n" +
    "collisionPossible(Vehicle1, Vehicle2) at T <-\n" +
    "\n" +
    "  location(Vehicle1, coordinate(X, Y), Direction1) at T,\n" +
    "  location(Vehicle2, coordinate(A, B), Direction2) at T,\n" +
    "  Vehicle1 != Vehicle2,\n" +
    "  % testPrint('collisionPossible' + Vehicle1 + ' '+Vehicle2),\n" +
    "  % there is a collision possiblity if the two direction are not the same\n" +
    "  % Direction1 != Direction2,\n" +
    "  warningZone(coordinate(X, Y),coordinate(A, B)).\n" +
    "\n" +
    "% warnning zone is two times the length of the car plus 10\n" +
    "warningZone(coordinate(X, Y),coordinate(A, B)) <-\n" +
    "  Manhattan = abs(X-A) + abs(Y-B),\n" +
    "  % 80 is two times the length of the car.\n" +
    "  Manhattan <= 90.\n" +
    "\n" +
    "onMainRoad(Vehicle) at T <-\n" +
    "  location(Vehicle, coordinate(X, Y), Direction1) at T,\n" +
    "  street(StreetName, coordinate(A, B), Width, Height, Number_of_lane, Priority),\n" +
    "  X<=A+Width, X>=A,\n" +
    "  Y<=B+Height, Y>=B,\n" +
    "  Priority > 0.\n" +
    "\n" +
    "opposite(Dir1,Dir2)<-Dir1 == eastward, Dir2 = westward.\n" +
    "opposite(Dir1,Dir2)<-Dir1 == westward, Dir2 = eastward.\n" +
    "opposite(Dir1,Dir2)<-Dir1 == northward, Dir2 = southward.\n" +
    "opposite(Dir1,Dir2)<-Dir1 == southward, Dir2 = northward.\n" +
    "opposite(Color1,Color2)<-Color1 == red, Color2 = green.\n" +
    "opposite(Color1,Color2)<-Color1 == green, Color2 = red.\n" +
    "% ---------------------------------------------------------------------------------------------\n" +
    "\n" +
    "\n" +
    "updates(step(Vehicle, NextPlace), location(VehicleIns, OldPlace, Direction),  location(VehicleIns, NextPlace, Direction))<-\n" +
    "  VehicleIns == Vehicle.\n" +
    "  % ('updating loc ' + Vehicle + ' '+ NextPlace).\n" +
    "\n" +
    "updates(turn(Vehicle, NewHeading) , location(VehicleIns, Place, OldHeading), location(VehicleIns, Place, NewHeading))<-\n" +
    "  Vehicle == VehicleIns.\n" +
    "  % ('updating turing ' + Vehicle + ' '+NewHeading).\n" +
    "\n" +
    "% updating the traffic light\n" +
    "updates(changeTrafficLight(Place,Color) , trafficLight(PlaceIns, OldColor, _, _), trafficLight(PlaceIns, Color, _, _))<-\n" +
    "  Place == PlaceIns.\n" +
    "\n" +
    "terminates(arrive(Vehicle), moving(Vehicle)).\n" +
    "initiates(arrive(Vehicle), stopped(Vehicle)).\n" +
    "\n" +
    "% % decision making will give a waiting state if car is not stopped\n" +
    "% terminates(decision_making(Vehicle), moving(Vehicle))<- not stopped(Vehicle).\n" +
    "% initiates(decision_making(Vehicle), waitting(Vehicle))<- not stopped(Vehicle).\n";

var obj = ProgramModifier(program);

var assert = require('assert');
describe('All Direction Testing', function() {
    it('full array:', function() {
        assert.deepEqual(resAll[0],  [ 'location', 'car2', 'coordinate', '700', '525', 'westward' ]);
        assert.deepEqual(resAll[1],  [ 'location', 'car1', 'coordinate', '475', '880', 'northward' ]);
        assert.deepEqual(resAll[2],  [ 'location', 'car0', 'coordinate', '145', '475', 'eastward' ]);
        assert.deepEqual(resAll[3],  [ 'moving', 'car2' ]);
        assert.deepEqual(resAll[4],  [ 'moving', 'car1' ]);
        assert.deepEqual(resAll[5],  [ 'moving', 'car0' ]);
    });


});
