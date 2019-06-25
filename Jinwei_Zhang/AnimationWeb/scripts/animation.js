(function (window) {
    // output test if pixi works in the browser or not.
    PIXI.utils.sayHello();

    /*
    * appManager is the object that allow other file to access the animation.
    * */
    var appManager = {
        vehicle: [],
        street: [],
        lights: []
    };
    /*
    *
    * */
    var app = new PIXI.Application({backgroundColor: 0xFFFFFF, width: 1200, height: 1000});;

    /*
    *
    * */
    var graphics = null;

    appManager.createVisualizer = function () {
        // the graphics object will be used throughout the class
        graphics = new PIXI.Graphics();
        document.getElementById("content").appendChild(app.view);
        console.log('the createVisualizer  has been called');

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

        const richText = new PIXI.Text('LPS Self-Driving car animation', style);
        richText.x = 300;
        richText.y = 0;

        // draw a coordinate system X
        graphics.lineStyle(5, 0x333, 1);
        graphics.moveTo(0, 0);
        graphics.lineTo(200, 0);
        const xText = new PIXI.Text('X', {fontFamily: 'Arial', fontSize: 15, fill: 0x333, align: 'center'});
        xText.x = 150;
        xText.y = 0;
        // draw a coordinate system Y
        graphics.lineStyle(5, 0x333, 1);
        graphics.moveTo(0, 0);
        graphics.lineTo(0, 200);

        const yText = new PIXI.Text('Y', {fontFamily: 'Arial', fontSize: 15, fill: 0x333, align: 'center'});
        yText.x = 0;
        yText.y = 150;

        const originText = new PIXI.Text('(0,0)', {fontFamily: 'Arial', fontSize: 15, fill: 0x333, align: 'center'});
        originText.x = 0;
        originText.y = 0;
        app.stage.addChild(richText);
        app.stage.addChild(graphics);
        app.stage.addChild(xText, yText, originText);


    };

    /*
    * This field will create the Road
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
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginFill(0x333);
        graphics.drawRect(x, y, width, height);
        graphics.endFill();

        app.stage.addChild(streetText);
    };


    /*
    * This field will create the vehicles with name, location and direction.
    * */
    appManager.createVehicle = function (vehicleName, x, y, direction) {
        console.log('creating vehicle has been called in animation.js ' + window.name);
        console.log(vehicleName, x, y, direction);
        // create a new Sprite from an image path
        var carInstance = PIXI.Sprite.from('imgs/carNorth.png');
        carInstance.anchor.set(0.5);
        carInstance.x = x;
        carInstance.y = y;

        //the length of the car is 40
        switch (direction) {
            case 'northward':
                // code block
                // carInstance = PIXI.Sprite.from('imgs/carNorth.png');
                break;
            case 'southward':
                // code block
                // carInstance = PIXI.Sprite.from('imgs/carSouth.png');
                carInstance.rotation += Math.PI;
                break;
            case 'eastward':
                // carInstance = PIXI.Sprite.from('imgs/carEast.png');
                carInstance.rotation += (Math.PI) / 2;
                break;
            case 'westward':
                // carInstance = PIXI.Sprite.from('imgs/carWest.png');
                carInstance.rotation -= (Math.PI) / 2;
                break;
            default:
                carInstance = PIXI.Sprite.from('imgs/carNorth.png');
        }

        // const graphics = new PIXI.Graphics();
        // graphics.lineStyle(2, 0x000000, 1);
        // graphics.beginFill(0x333);
        // graphics.drawRect(x, y, 2, 2);
        // graphics.endFill();
        // center the sprite's anchor point


        let carText = new PIXI.Text(vehicleName, {fontFamily: 'Arial', fontSize: 12, fill: 0x007bff});
        carText.x = x - 15;
        carText.y = y - 40;


        // carInstance.rotation = 45*(Math.PI/180);

        appManager.vehicle.push({
            name: vehicleName,
            textObj: carText,
            xLoc: x,
            yLoc: y,
            direction: direction,
            obj: carInstance
        });
        app.stage.addChild(carInstance);
        app.stage.addChild(carText);
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
                if (item.direction !== direction) {

                    if ((item.direction === 'southward' && direction === 'northward') ||
                        (item.direction === 'eastward' && direction === 'westward') ||
                        (item.direction === 'northward' && direction === 'southward') ||
                        (item.direction === 'westward' && direction === 'eastward')) {
                        item.obj.rotation += Math.PI;
                    } else if ((item.direction === 'southward' && direction === 'eastward') ||
                        (item.direction === 'eastward' && direction === 'northward') ||
                        (item.direction === 'northward' && direction === 'westward') ||
                        (item.direction === 'westward' && direction === 'southward')) {
                        item.obj.rotation -= Math.PI / 2;

                    } else if ((item.direction === 'southward' && direction === 'westward') ||
                        (item.direction === 'westward' && direction === 'northward') ||
                        (item.direction === 'northward' && direction === 'eastward') ||
                        (item.direction === 'eastward' && direction === 'southward')) {
                        item.obj.rotation += Math.PI / 2;
                    }

                    item.direction = direction;
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

    }

    /*
    * this method will clear out the street and vehicle information
    * the basic canvas will remain the same (coordinate axis and the title text)
    * */
    appManager.clearContent = function () {
        appManager.vehicle = [];
        appManager.street = [];
        for (var i = app.stage.children.length - 1; i >= 0; i--) {
            app.stage.removeChild(app.stage.children[i]);
        }
        // if (graphics!= null){
        //     graphics.destroy();
        // }

        // app.stage.children = [];
        // app = null;
        // graphics = null;
    };


    /*
* this method will clear out the street and vehicle information
* the basic canvas will remain the same (coordinate axis and the title text)
* */
     appManager.createClound = function(x,y){
         //    define some cloud for the front end
         var cloudInstance = PIXI.Sprite.from('imgs/clouds.png');
         cloudInstance.anchor.set(0.5);
         cloudInstance.x = x;
         cloudInstance.y = y;
         app.stage.addChild(cloudInstance);


     }




    window.appManager = appManager;

})(window);
