(function (window) {
    // output test if pixi works in the browser or not.
    PIXI.utils.sayHello();

    /*
    * appManager is the object that allow other file to access the animation.
    * */
    var appManager = {
        vehicle: [],
        street: [],
        lights: [],
        block: []
    };

    /*
    * data manager consist of the global information of the number of car and the response using to detect user click event
    * */
    var dataManager = {
        responseTime : 0,
        carCounter:0

    };

    /*
    *UI manager manage the UI field including the graphics, button and textures.
    * */
    var UIManager = {
        graphics : null,
        richTextTitle: null,
        richTextAction: null,
        xAxisText:null,
        yAxisText:null,
        originPointText:null,
        textureButtonPlus : null,
        textureButtonPlusOver : null,
        textureButtonPlusDown : null,
        textureButtonMinus : null,
        textureButtonMinusOver : null,
        textureButtonMinusDown : null,

        buttonPlus : null,
        buttonMinus : null
    };

    /*
    *The main application framework to host the whole canvas with height etc are defined here
    * */
    var app = new PIXI.Application({backgroundColor: 0x1099bb, width: 1300, height: 1000});

    /*
    * Initialise the canvas, all the buttons, title text, define the base graphic
    * */
    appManager.createVisualizer = function () {
        // the graphics object will be used throughout the class
        UIManager.graphics = new PIXI.Graphics();
        document.getElementById("content").appendChild(app.view);
        console.log('The createVisualizer  has been called');

        //LPS sample animation text
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 20,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        UIManager.richTextTitle = new PIXI.Text('LPS Self-Driving car animation', style);
        UIManager.richTextTitle.x = 300;
        UIManager.richTextTitle.y = 0;

        UIManager.richTextAction = new PIXI.Text('Action: ', style);
        UIManager.richTextAction.x = 700;
        UIManager.richTextAction.y = 0;

        // draw a coordinate system X
        UIManager.graphics.lineStyle(5, 0x333, 1);
        UIManager.graphics.moveTo(0, 0);
        UIManager.graphics.lineTo(200, 0);

        UIManager.xAxisText = new PIXI.Text('X', {fontFamily: 'Arial', fontSize: 15, fill: 0x333, align: 'center'});
        UIManager.xAxisText.x = 150;
        UIManager.xAxisText.y = 0;
        // draw a coordinate system Y
        UIManager.graphics.lineStyle(5, 0x333, 1);
        UIManager.graphics.moveTo(0, 0);
        UIManager.graphics.lineTo(0, 200);

        UIManager.yAxisText = new PIXI.Text('Y', {fontFamily: 'Arial', fontSize: 15, fill: 0x333, align: 'center'});
        UIManager.yAxisText.x = 0;
        UIManager.yAxisText.y = 150;

        // draw a original point in the coordinate system
        UIManager.originPointText = new PIXI.Text('(0,0)', {fontFamily: 'Arial', fontSize: 15, fill: 0x333, align: 'center'});
        UIManager.originPointText.x = 0;
        UIManager.originPointText.y = 0;

        app.stage.addChild(UIManager.richTextTitle,UIManager.richTextAction);
        app.stage.addChild(UIManager.graphics);
        app.stage.addChild(UIManager.xAxisText, UIManager.yAxisText, UIManager.originPointText);


        UIManager.textureButtonPlus = PIXI.Texture.from('imgs/plus-circle.png');
        UIManager.textureButtonPlusOver = PIXI.Texture.from('imgs/plus-circle-2.png');
        UIManager.textureButtonPlusDown = PIXI.Texture.from('imgs/plus-circle-3.png');

        UIManager.textureButtonMinus = PIXI.Texture.from('imgs/minus-circle.png');
        UIManager.textureButtonMinusOver = PIXI.Texture.from('imgs/minus-circle-2.png');
        UIManager.textureButtonMinusDown = PIXI.Texture.from('imgs/minus-circle-3.png');

        //this part here is the button creator
        UIManager.buttonPlus = new PIXI.Sprite(UIManager.textureButtonPlus);
        UIManager.buttonMinus = new PIXI.Sprite(UIManager.textureButtonMinus);
        UIManager.buttonPlus.buttonMode = true;
        UIManager.buttonMinus.buttonMode = true;

        UIManager.buttonMinus.x =1220; UIManager.buttonMinus.y = 0;
        UIManager.buttonPlus.x = 1220; UIManager.buttonPlus.y = 90;


        // make the button interactive...
        UIManager.buttonPlus.interactive = true;
        UIManager.buttonPlus.buttonMode = true;
        UIManager.buttonMinus.interactive = true;
        UIManager.buttonMinus.buttonMode = true;

        UIManager.buttonPlus
        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        // button events.
            .on('pointerdown', onButtonPlusDown)
            .on('pointerup', onButtonPlusUp)
            .on('pointerupoutside', onButtonPlusUp)
            .on('pointerover', onButtonPlusOver)
            .on('pointerout', onButtonPlusOut);

        UIManager.buttonMinus
        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        // button events.
            .on('pointerdown', onButtonMinusDown)
            .on('pointerup', onButtonMinusUp)
            .on('pointerupoutside', onButtonMinusUp)
            .on('pointerover', onButtonMinusOver)
            .on('pointerout', onButtonMinusOut);

        // add it to the stage
        app.stage.addChild(UIManager.buttonPlus,UIManager.buttonMinus);

        function onButtonPlusDown() {

            this.isdown = true;
            this.texture = UIManager.textureButtonPlusDown;
            this.alpha = 1;
            vehicleName = 'car'+ dataManager.carCounter.toString();
            UIManager.richTextAction.text = 'creating :' + vehicleName;
            appManager.createVehicle(vehicleName, 800, 800, 'northward');
        }

        function onButtonPlusUp() {
            this.isdown = false;
            if (this.isOver) {
                this.texture = UIManager.textureButtonPlusOver;
            } else {
                this.texture = UIManager.textureButtonPlus;
            }
        }

        function onButtonPlusOver() {
            this.isOver = true;
            if (this.isdown) {
                return;
            }
            this.texture = UIManager.textureButtonPlusOver;
        }

        function onButtonPlusOut() {
            this.isOver = false;
            if (this.isdown) {
                return;
            }
            this.texture = UIManager.textureButtonPlus;
        }

        function onButtonMinusDown() {
            this.isdown = true;
            this.texture = UIManager.textureButtonMinusDown;
            this.alpha = 1;
        }

        function onButtonMinusUp() {
            this.isdown = false;
            if (this.isOver) {
                this.texture = UIManager.textureButtonMinusOver;
            } else {
                this.texture = UIManager.textureButtonMinus;
            }
        }

        function onButtonMinusOver() {
            this.isOver = true;
            if (this.isdown) {
                return;
            }
            this.texture = UIManager.textureButtonMinusOver;
        }

        function onButtonMinusOut() {
            this.isOver = false;
            if (this.isdown) {
                return;
            }
            this.texture = UIManager.textureButtonMinus;
        }

    };


    /*
    * adding goal tag onto the map
    * */
    appManager.addGoal = function(vehicle, x, y){
        console.log('addGoal has been called in animation.js ' + window.name);

        UIManager.graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        UIManager.graphics.beginFill(0xff0000, 1);
        UIManager.graphics.drawCircle(x, y, 7);
        UIManager.graphics.endFill();


        let goalText = new PIXI.Text('(' + x.toString() + ',' + y.toString()+')', {fontFamily: 'Arial', fontSize: 12, fill: 0xffffff});
        goalText.x = x;
        goalText.y = y;
        app.stage.addChild(goalText);

    };

    /*
    * This field will create the all the road depends on what the user is defined.
    * */
    appManager.createRoad = function (nameText, x, y, width, height, laneNumber) {
        console.log('creating Road has been called in animation.js ' + window.name);
        console.log(nameText, x, y, width, height, laneNumber);
        //main street text
        let streetText = new PIXI.Text(nameText, {fontFamily: 'Arial', fontSize: 18, fill: 0xFFFFFF});

        if (width > height) {
            streetText.x = (x + width + x) / 2;
            streetText.y = y;
        } else {
            streetText.x = x + width;
            streetText.y = (y + height + y) / 2;
            streetText.rotation = Math.PI / 2;
        }
        //main street
        UIManager.graphics.lineStyle(2, 0xFFFFFF, 1);
        UIManager.graphics.beginFill(0x333);
        UIManager.graphics.drawRect(x, y, width, height);
        UIManager.graphics.endFill();

        appManager.street.push({
            nameText:nameText,
            x:x,
            y:y,
            width:width,
            height:height,
            laneNumber:laneNumber
        });

        app.stage.addChild(streetText);
    };


    /*
  * This field will create the rotated road depends on the user defined
  * */
    appManager.createRotateRoad = function(x1,y1,x2,y2,x3,y3,x4,y4){
        // draw polygon
        console.log("add rotateed rd has been called");
        const path = [x1,y1,x2,y2,x3,y3,x4,y4];

        UIManager.graphics.lineStyle(2, 0xFFFFFF, 1);
        UIManager.graphics.beginFill(0x333);
        UIManager.graphics.drawPolygon(path);
        UIManager.graphics.endFill();
    };
    /*
    * This field will create the roundabout
    * */
    appManager.createRoundabout = function(x1,y1,radius1,radiu2,radiu3){

        // Circle + line style 1 outer roundabout
        UIManager.graphics.lineStyle(2, 0xFFFFFF, 1);
        UIManager.graphics.beginFill(0x333, 1);
        UIManager.graphics.drawCircle(x1, y1, radiu3);
        UIManager.graphics.endFill();

        // Circle + line style 1 middle roundabout
        UIManager.graphics.lineStyle(2, 0xFFFFFF, 1);
        UIManager.graphics.beginFill(0x333, 1);
        UIManager.graphics.drawCircle(x1, y1, radiu2);
        UIManager.graphics.endFill();

        // inner cycle
        UIManager.graphics.lineStyle(2, 0x1099bb, 1);
        UIManager.graphics.beginFill(0x1099bb, 1);
        UIManager.graphics.drawCircle(x1, y1, radius1);
        UIManager.graphics.endFill();
    };

    /*
    * This field will create the vehicles with name, location and direction.
    * */
    appManager.createVehicle = function (vehicleName, x, y, direction) {
        dataManager.carCounter += 1;
        console.log('creating vehicle has been called in animation.js ' + window.name);
        console.log(vehicleName, x, y, direction);

        // create a new Sprite from an image path
        var carInstance = PIXI.Sprite.from('imgs/carNorth.png');
        carInstance.anchor.set(0.5);
        carInstance.x = x;
        carInstance.y = y;

        // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
        carInstance.interactive = true;
        // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
        carInstance.buttonMode = true;

        // setup events for mouse + touch using
        // the pointer events
        carInstance
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);

        northVector = [0,-1];
        cosTheta = northVector[0]*direction[0]+ northVector[1]*direction[1];
        console.log("costheta: "+ direction[0],direction[1]);
        console.log("arc cos theta: "+ Math.acos(cosTheta));
        //the length of the car is 40
        if (direction[0] >= 0) {
            carInstance.rotation += Math.acos(cosTheta);
        }else{
            carInstance.rotation -= Math.acos(cosTheta);
        }
        // switch (direction) {
        //     case 'northward':
        //         // code block
        //         // carInstance = PIXI.Sprite.from('imgs/carNorth.png');
        //         break;
        //     case 'southward':
        //         // code block
        //         // carInstance = PIXI.Sprite.from('imgs/carSouth.png');
        //         carInstance.rotation += Math.PI;
        //         break;
        //     case 'eastward':
        //         // carInstance = PIXI.Sprite.from('imgs/carEast.png');
        //         carInstance.rotation += (Math.PI) / 2;
        //         break;
        //     case 'westward':
        //         // carInstance = PIXI.Sprite.from('imgs/carWest.png');
        //         carInstance.rotation -= (Math.PI) / 2;
        //         break;
        //     default:
        //         console.log('direction format wrong');
        //         break;
        // }

        // const graphics = new PIXI.Graphics();
        // graphics.lineStyle(2, 0x000000, 1);
        // graphics.beginFill(0x333);
        // graphics.drawRect(x, y, 2, 2);
        // graphics.endFill();
        // center the sprite's anchor point


        let carText = new PIXI.Text(vehicleName, {fontFamily: 'Arial', fontSize: 12, fill: 0xffffff});
        carText.x = x - 15;
        carText.y = y - 40;

        let carLocText = new PIXI.Text('(' + x.toString() + ',' + y.toString()+')', {fontFamily: 'Arial', fontSize: 12, fill: 0xffffff});
        carLocText.x = x - 25;
        carLocText.y = y + 25;


        // carInstance.rotation = 45*(Math.PI/180);

        appManager.vehicle.push({
            name: vehicleName,
            textObj: carText,
            carLocText : carLocText,
            // xLoc: x,
            // yLoc: y,
            direction: direction,
            obj: carInstance
        });
        app.stage.addChild(carInstance);
        app.stage.addChild(carText,carLocText);

        function onDragStart(event) {
            dataManager.responseTime = Date.now();
            // store a reference to the data
            // the reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = event.data;
            this.alpha = 0.5;
            this.dragging = true;

        }

        /**
         * In the drag end the information in the appManager and the original lps program should change.
         *
         * 1. deletion
         * 2. modification
         */

        function onDragEnd() {
            // This does not allow multi touch since we are only record one time response time.
            var timeSpan = Date.now() - dataManager.responseTime;
            //    if user click on the object the orientation should change clockwise
            if (timeSpan < 100){
                this.rotation += (Math.PI) / 2;
            }

            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
            if (this.x > 1020 && this.y < 90){
                // this part should be user delete the car manually.
                // vehicle should be deleted in the appManager and app.stage
                appManager.removeVehicle(this);
            }

            //adjust the car location on to the street.
            postationArr = appManager.coordinateCorrection(this.x,this.y);
            this.x = postationArr[0];
            this.y = postationArr[1];
            var findObj = this;

            // move the car text and the coordination accordingly.
            appManager.vehicle.forEach(function (item, index) {
                if (item.obj === findObj) {
                    item.textObj.x = postationArr[0] - 15;
                    item.textObj.y = postationArr[1] - 40;
                    item.carLocText.text = '(' + postationArr[0] .toString() + ',' + postationArr[1].toString()+')';
                    item.carLocText.x = postationArr[0] - 25;
                    item.carLocText.y = postationArr[1]  + 25;
                    //if the time span is less than 100 meaning the direction has changed.
                    if (timeSpan < 100) {
                        xBefore = item.direction[0];
                        yBefore = item.direction[1];
                        xAfter = xBefore*Math.cos(Math.PI/2) - yBefore*Math.sin(Math.PI/2);
                        yAfter = yBefore*Math.cos(Math.PI/2) + xBefore*Math.sin(Math.PI/2);
                        item.direction = [xAfter,yAfter];
                        // switch (item.direction) {
                        //     case 'northward':
                        //         item.direction = 'eastward';
                        //         break;
                        //     case 'southward':
                        //         item.direction = 'westward';
                        //         break;
                        //     case 'eastward':
                        //         item.direction = 'southward';
                        //         break;
                        //     case 'westward':
                        //         item.direction = 'northward';
                        //         break;
                        //     default:
                        //         console.log('direction format wrong');
                        //         break;
                        // }
                    }
                }
            });

            console.log(appManager.vehicle);
        }

        /**
         * while the user is dragging the car both the text and the car object should move together.
         *
         */
        function onDragMove() {
            if (this.dragging) {
                //console.log(this);
                const newPosition = this.data.getLocalPosition(this.parent);
                this.x = newPosition.x;
                this.y = newPosition.y;
                var findObj = this;
                appManager.vehicle.forEach(function (item, index) {

                    if (item.obj === findObj) {
                        item.textObj.x = newPosition.x - 15;
                        item.textObj.y = newPosition.y - 40;
                        item.carLocText.text = '(' + Math.round(newPosition.x).toString() + ',' + Math.round(newPosition.y).toString()+')';
                        item.carLocText.x = newPosition.x - 25;
                        item.carLocText.y = newPosition.y + 25;
                    }
                });



                // If the car was moved into the deletion area.
                if (this.x > 1220 && this.y < 90 ){
                    if (this.scale.x <= 3 ) {
                        this.scale.x *= 1.07;
                        this.scale.y *= 1.07;
                    }

                    UIManager.buttonMinus.texture = UIManager.textureButtonMinusDown;
                // If the car was moved out of the deletion area.
                }else{
                    if(this.scale.x > 1){
                        this.scale.x /= 1.07;
                        this.scale.y /= 1.07;
                        UIManager.buttonMinus.texture = UIManager.textureButtonMinus;
                    }
                }


            }
        }
    };

    /*
    * Will remove the vehicle if user drop the vehicel in the deletion area
    * */
    appManager.removeVehicle = function(carSpriteObj, carName=null){
        for (var i = appManager.vehicle.length - 1; i >= 0; i--) {
            if (appManager.vehicle[i].obj === carSpriteObj){
                UIManager.richTextAction.text = appManager.vehicle[i].name + " deleted";
                app.stage.removeChild(appManager.vehicle[i].obj);
                app.stage.removeChild(appManager.vehicle[i].textObj);
                app.stage.removeChild(appManager.vehicle[i].carLocText);
                appManager.vehicle.splice(i,1);
            }

        }

    };

    /*
    * this field will modify the child in app
    * */
    appManager.changeVehicleLocation = function (vehicleName, x, y, direction) {
        appManager.vehicle.forEach(function (item, index) {
            if (item.name === vehicleName) {
                item.obj.x = x;
                item.obj.y = y;
                item.textObj.x = x - 15;
                item.textObj.y = y - 40;
                item.carLocText.text = '(' + x.toString() + ',' + y.toString()+')';
                item.carLocText.x = x - 25;
                item.carLocText.y = y + 25;

                if (item.direction[0] !== direction[0] || item.direction[1] !== direction[1]) {
                    xBefore = item.direction[0];
                    yBefore = item.direction[1];
                    xAfter = direction[0];
                    yAfter = direction[1];
                    item.rotation += Math.acos(xBefore*xAfter + yBefore*yAfter);
                    // if ((item.direction === 'southward' && direction === 'northward') ||
                    //     (item.direction === 'eastward' && direction === 'westward') ||
                    //     (item.direction === 'northward' && direction === 'southward') ||
                    //     (item.direction === 'westward' && direction === 'eastward')) {
                    //     item.obj.rotation += Math.PI;
                    // } else if ((item.direction === 'southward' && direction === 'eastward') ||
                    //     (item.direction === 'eastward' && direction === 'northward') ||
                    //     (item.direction === 'northward' && direction === 'westward') ||
                    //     (item.direction === 'westward' && direction === 'southward')) {
                    //     item.obj.rotation -= Math.PI / 2;
                    //
                    // } else if ((item.direction === 'southward' && direction === 'westward') ||
                    //     (item.direction === 'westward' && direction === 'northward') ||
                    //     (item.direction === 'northward' && direction === 'eastward') ||
                    //     (item.direction === 'eastward' && direction === 'southward')) {
                    //     item.obj.rotation += Math.PI / 2;
                    // }

                    item.direction = direction;
                }

                // check if there is any car passing through each other.
                var found = false;
                appManager.vehicle.forEach(function (itemNext, index) {
                    // if we find a opposite position car we will change the color of the text
                    if (appManager.oppositeDir(item,itemNext)) {
                        found = true;
                        item.textObj.style.fill = 0xff0000;
                        item.carLocText.style.fill = 0xff0000;
                        itemNext.textObj.style.fill = 0xff0000;
                        itemNext.carLocText.style.fill = 0xff0000;
                        console.log(item.name,itemNext.name);
                        console.log(item.obj.name,itemNext.name);
                        console.log("testing changing color"+"-----------------");
                    }
                });

                if(found === false){
                    //change back the color to white. this is really pointless.
                    // item.textObj.style.fill  =  0xffffff;
                    item.textObj.style.fill = 0xffffff;
                    item.carLocText.style.fill = 0xffffff;
                }

            }
        });

    };

    /*
    * this field will create the traffic light based on the location
    * */
    appManager.createTrafficLight = function(x, y, initialColor){
        console.log('creating createTrafficLight has been called in animation.js ' + window.name);
        console.log( x, y, initialColor);
        var lightInstance = null;


        var lightText = null;
        if (initialColor === 'red' ){
            lightInstance = PIXI.Sprite.from('imgs/TrafficLight.png');
            lightText = new PIXI.Text(initialColor, {fontFamily: 'Arial', fontSize: 14, fill: 0xff0000});
        }else if (initialColor === 'green' ){
            lightInstance = PIXI.Sprite.from('imgs/TrafficLight.png');
            lightText = new PIXI.Text(initialColor, {fontFamily: 'Arial', fontSize: 14, fill: 0x00ff00});
        }

        lightInstance.anchor.set(0.5);
        lightInstance.x = x;
        lightInstance.y = y;

        lightText.x = x - 15;
        lightText.y = y - 40;
        appManager.lights.push({
            name: "trafficLight",
            textObj: lightText,
            xLoc: x,
            yLoc: y,
            obj: lightInstance
        });
        app.stage.addChild(lightInstance);
        app.stage.addChild(lightText);

    };

    /*
    * this field will change the traffic
    * */
    appManager.changeTrafficLight = function(x, y, color){
        // console.log('change traffic light has been called');
        appManager.lights.forEach(function (item, index) {
            // console.log(item);

            if (item.xLoc === x && item.yLoc ===  y) {

                // console.log(x, y, color);
                if (color === 'green'){
                    // console.log('this has also been called');
                    item.textObj.text = color;
                    item.textObj.style = {fontFamily: 'Arial', fontSize: 14, fill: 0x00ff00};
                }else if(color === 'red'){
                    item.textObj.text = color;
                    item.textObj.style = {fontFamily: 'Arial', fontSize: 14, fill: 0xff0000};
                }
            }
        });
    };

    /*
    * this method will clear out the street and vehicle information
    * the basic canvas will remain the same (coordinate axis and the title text)
    * */
    appManager.clearContent = function () {
        appManager.vehicle = [];
        appManager.street = [];
        appManager.lights = [];
        for (var i = app.stage.children.length - 1; i >= 0; i--) {
            app.stage.removeChild(app.stage.children[i]);
        }
        // if (graphics!= null){
        //     graphics.destroy();
        // }

        // app.stage.children = [];
        // app = null;
    };


    /*
    * this method will create the cloud and animate the cloud in the canvas
    * */
     appManager.createCloud = function(x, y){
         //    define some cloud for the front end
         var cloudInstance = PIXI.Sprite.from('imgs/clouds.png');
         cloudInstance.anchor.set(0.5);
         cloudInstance.x = x;
         cloudInstance.y = y;
         app.stage.addChild(cloudInstance);
         app.ticker.add((delta) => {

             // use delta to transform the cloud image
             if (cloudInstance.x >= 1000){
                 cloudInstance.x = 100;
             }else{
                 cloudInstance.x += 0.2 * delta;
             }
         });

     };


     /*
     * correct the coordinate on to the street. use might place the car onto other part rather than the road
     * */
     appManager.coordinateCorrection = function(x, y){
         var newX = x;
         var newY = y;
         appManager.street.forEach(function (item, index) {
             if(x>item.x && x<item.x + item.width && y> item.y && y<item.y + item.height){
                 // UIManager.richTextAction.text = "Correction on: " + item.nameText;
                 // console.log("Correction on: " + item.nameText);
                 //west east facing street
                 if (item.width > item.height){

                     newY = Math.round(((item.y + item.y + item.height)/2));
                     newX = Math.round(Math.ceil(x/5)*5);
                     // console.log("on: " + newX.toString() + ' '+ newY.toString());
                     return [newX, newY]
                 }else{
                 // north south facing street
                     newX = Math.round(((item.x + item.x + item.width)/2));
                     newY = Math.round(Math.ceil(y/5)*5);
                     // console.log("on: " + newX.toString() + ' '+ newY.toString());
                     return [newX, newY]
                 }

             }
         });

         return [ Math.round(newX),  Math.round(newY)]
     };

     /*
     * When there is a blocked item placed by user/program the front end will show up a cross
     * */
     appManager.createBlockItem =function(x, y, itemName){
         console.log('creating createBlockItem has been called in animation.js ' + window.name);
         console.log( x, y, itemName);
         var blockItemInstance = null;

        // leave the item for further development.
        switch (itemName) {
            case 'cross':
                blockItemInstance = PIXI.Sprite.from('imgs/cross.png');
                break;

            case 'brokencar':
                blockItemInstance = PIXI.Sprite.from('imgs/brokencar.png');
                break;

            case 'pedestrian':
                blockItemInstance = PIXI.Sprite.from('imgs/pedestrian.png');
                break

            case 'hole':
                blockItemInstance = PIXI.Sprite.from('imgs/hole.png');
                break;

            default:
                blockItemInstance = PIXI.Sprite.from('imgs/cross.png');
                break
        }


         blockItemInstance.anchor.set(0.5);
         blockItemInstance.x = x;
         blockItemInstance.y = y;

         appManager.block.push({
             name: itemName,
             obj: blockItemInstance
         });
         app.stage.addChild(blockItemInstance);
     };

    /*
    * This part is checking all the adding cars that is there is any car that is opposite to each other (same horizontal or vertical level)
    * */
    appManager.oppositeDir = function(item1,item2){
        dir1 = [item1.direction[0],item1.direction[1]];
        dir2 = [item2.direction[0],item2.direction[1]];
        angle = Math.acos(dir1[0]*dir2[0] + dir1[1]*dir2[1]);
        return angle === Math.PI / 2 || angle === -Math.PI / 2;


        // switch (item1.direction) {
        //     case 'northward':
        //         return (item2.direction === 'southward' && item1.obj.x === item2.obj.x && Math.abs(item1.obj.y - item2.obj.y)<120);
        //     case 'southward':
        //         return (item2.direction === 'northward' && item1.obj.x === item2.obj.x &&  Math.abs(item2.obj.y - item1.obj.y )< 120);
        //     case 'eastward':
        //         return (item2.direction === 'westward' && item1.obj.y === item2.obj.y && Math.abs(item2.obj.x - item1.obj.x) < 120);
        //     case 'westward':
        //         return (item2.direction === 'eastward' && item1.obj.y === item2.obj.y && Math.abs(item1.obj.x - item2.obj.x) < 120 );
        //     default:
        //         console.log('direction wrong');
        //         return false;
        // }
    };


    window.appManager = appManager;

})(window);
