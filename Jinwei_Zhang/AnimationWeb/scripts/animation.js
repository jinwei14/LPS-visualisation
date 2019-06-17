(function (window) {
    // output test if pixi works in the browser or not.
    PIXI.utils.sayHello();

    var appManager = {
        vehicle: [],
        street: []
    };

    const app = new PIXI.Application({backgroundColor: 0xFFFFFF, width: 1200, height: 1000});
    const graphics = new PIXI.Graphics();

    appManager.createVisualizer = function () {
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

        const richText = new PIXI.Text('LPS sample animation', style);
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

    //this field will create the Road
    appManager.createRoad = function (nameText, x, y, width, height, laneNumber) {
        console.log('creating Road has been called in animation.js ' + window.name);
        console.log(nameText, x, y, width, height, laneNumber);
        //main street text
        let streetText = new PIXI.Text(nameText, {fontFamily: 'Arial', fontSize: 18, fill: 0xFFFFFF});

        if (width>height){
            streetText.x = (width + x)/2;
            streetText.y = y;
        }else{
            streetText.x = x;
            streetText.y = (height+y)/2;
            streetText.rotation = Math.PI / 2;
        }
        //main street
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginFill(0x333);
        graphics.drawRect(x, y, width, height);
        graphics.endFill();

        app.stage.addChild(streetText);
    };

    //this field will create the vehicles with name, location and direction.
    appManager.createVehicle = function (vehicleName, x, y, direction) {
        console.log('creating vehicle has been called in animation.js ' + window.name);
        console.log(vehicleName, x, y, direction);
        // create a new Sprite from an image path
        var carInstance = null;
        //the length of the car is 40
        switch(direction) {
            case 'northward':
                // code block
                carInstance = PIXI.Sprite.from('imgs/carNorth.png');
                break;
            case 'southward':
                // code block
                carInstance = PIXI.Sprite.from('imgs/carSouth.png');
                break;
            case 'eastward':
                carInstance = PIXI.Sprite.from('imgs/carEast.png');
                break;
            case 'westward':
                carInstance = PIXI.Sprite.from('imgs/carWest.png');
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
        carInstance.anchor.set(0.5);
        carInstance.x = x;
        carInstance.y = y;

        let carText = new PIXI.Text(vehicleName, {fontFamily: 'Arial', fontSize: 12, fill: 0x007bff});
        carText.x = x-15;
        carText.y = y-40;


        // carInstance.rotation = 45*(Math.PI/180);

        appManager.vehicle.push({
            name: vehicleName,
            textObj:carText,
            xLoc: x,
            yLoc: y,
            direction: direction,
            obj: carInstance
        });
        app.stage.addChild(carInstance);
        app.stage.addChild(carText);
    };

    //this field will modify the child in app
    appManager.changeVehicleLocation = function (vehicleName, x, y, direction) {
        appManager.vehicle.forEach(function (item, index) {
            if (item.name === vehicleName){
                item.obj.x = x;
                item.obj.y = y;
                item.textObj.x = x-15;
                item.textObj.y = y-40;
                if (item.direction !== direction){
                    console.log('further turning implementation');
                }
            }
        });

    };
    // //this field will add all the children to the app
    // appManager.addChildren = function () {
    //     console.log('the children adding has been called');
    //     app.stage.addChild(richText);
    //     app.stage.addChild(graphics);
    //     app.stage.addChild(xText, yText, originText);
    //     app.stage.addChild(streetText);
    //     app.stage.addChild(myCar);
    //
    //     // // Listen for animate update
    //     // app.ticker.add((delta) => {
    //     //
    //     //     if (myCar.x <= 600) {
    //     //         myCar.x += 1;
    //     //     }
    //     // });
    //
    // };


    window.appManager = appManager;

})(window);
