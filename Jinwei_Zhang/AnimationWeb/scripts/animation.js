(function (window) {
    // output test if pixi works in the browser or not.
    PIXI.utils.sayHello();
    var appManager = {};


    const app = new PIXI.Application({backgroundColor: 0xFFFFFF, width: 1200, height: 1000});
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
    richText.x = 20;
    richText.y = 20;
    const graphics = new PIXI.Graphics();

    appManager.createVisualizer = function () {
        document.getElementById("content").appendChild(app.view);
        console.log('the createVisualizer  has been called');
    };


//main street text
    let streetText = new PIXI.Text('Main Street', {fontFamily: 'Arial', fontSize: 24, fill: 0xFFFFFF});
    streetText.x = 400;
    streetText.y = 340;
    //main street
    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.beginFill(0x333);
    graphics.drawRect(200, 340, 900, 70);
    graphics.endFill();


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


// create a new Sprite from an image path
    const myCar = PIXI.Sprite.from('imgs/myCar.png');


// center the sprite's anchor point
    myCar.x = 150;
    myCar.y = 340;

    appManager.addChildren = function () {
        app.stage.addChild(richText);
        app.stage.addChild(graphics);
        app.stage.addChild(xText, yText, originText);
        app.stage.addChild(streetText);
        app.stage.addChild(myCar);

        // Listen for animate update
        app.ticker.add((delta) => {

            if (myCar.x <= 600) {
                myCar.x += 1;
            }

        });
        console.log('the children adding has been called');
    };


    window.appManager = appManager;

})(window);
