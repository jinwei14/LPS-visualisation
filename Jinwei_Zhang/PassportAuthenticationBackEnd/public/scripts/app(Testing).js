PIXI.utils.sayHello();
// app.js should read the data through either json or xml or anydata structure and visualise here.

const app = new PIXI.Application({backgroundColor: 0xFFFFFF, width: 1200, height: 1000});
document.getElementById("content").appendChild(app.view);

// const basicText = new PIXI.Text('Basic text in pixi');
// basicText.x = 50;
// basicText.y = 100;
//
// app.stage.addChild(basicText);

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
app.stage.addChild(richText);

const graphics = new PIXI.Graphics();
//main street
let text1 = new PIXI.Text('Main Street', {fontFamily: 'Arial', fontSize: 24, fill: 0xFFFFFF});
text1.x = 350;
text1.y = 520;

graphics.lineStyle(2, 0xFFFFFF, 1);
graphics.beginFill(0x333);
graphics.drawRect(200, 500, 900, 70);
graphics.endFill();

//west street
let text2 = new PIXI.Text('West Street', {fontFamily: 'Arial', fontSize: 24, fill: 0xFFFFFF});
text2.x = 245;
text2.y = 300;
text2.rotation = Math.PI / 2;
graphics.lineStyle(2, 0xFFFFFF, 1);
graphics.beginFill(0x333);
graphics.drawRect(200, 100, 70, 800);
graphics.endFill();


//high street
let text3 = new PIXI.Text('High Street', {fontFamily: 'Arial', fontSize: 24, fill: 0xFFFFFF});
text3.x = 645;
text3.y = 300;
text3.rotation = Math.PI / 2;
graphics.lineStyle(2, 0xFFFFFF, 1);
graphics.beginFill(0x333);
graphics.drawRect(600, 100, 70, 800);
graphics.endFill();

//south street
let text4 = new PIXI.Text('South Street', {fontFamily: 'Arial', fontSize: 24, fill: 0xFFFFFF});
text4.x = 350;
text4.y = 920;
graphics.lineStyle(2, 0xFFFFFF, 1);
graphics.beginFill(0x333);
graphics.drawRect(200, 900, 900, 70);
graphics.endFill();

// create a new Sprite from an image path
const myCar = PIXI.Sprite.from('imgs/myCar.png');
const yourCar = PIXI.Sprite.from('imgs/yourCar.png');
const troubleMaker = PIXI.Sprite.from('imgs/troubleMaker.png');
const otherCar = PIXI.Sprite.from('imgs/otherCar.png');
const broken = PIXI.Sprite.from('imgs/broken.png');

// center the sprite's anchor point
myCar.x = 200;
myCar.y = 100;

yourCar.x = 600;
yourCar.y = 100;

troubleMaker.x = 600;
troubleMaker.y = 200;

otherCar.x = 1000;
otherCar.y = 500;

broken.x = 200;
broken.y = 700;
// move the sprite to the center of the screen
// myCar.x = app.screen.width / 20;
// myCar.y = app.screen.height / 20;

app.stage.addChild(graphics);
app.stage.addChild(text1, text2, text3, text4);
app.stage.addChild(myCar, yourCar, troubleMaker, otherCar, broken);

// Listen for animate update
app.ticker.add((delta) => {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    // bunny.rotation += 0.1 * delta;
    if (myCar.y <= 600) {
        myCar.y += 1;
    }

    if (otherCar.x > 660
        && Math.abs(troubleMaker.x - otherCar.x) + Math.abs(troubleMaker.y - otherCar.y) > 200
        && Math.abs(yourCar.x - otherCar.x) + Math.abs(yourCar.y - otherCar.y) > 200) {
        otherCar.x -= 1;
    } else if (otherCar.x == 660 && otherCar.rotation < Math.PI / 2) {
        otherCar.rotation += 0.1 * delta;

    } else if (otherCar.x == 660 && otherCar.y >= 100 && otherCar.rotation >= Math.PI / 2) {
        otherCar.y -= 1;
    }

    if (troubleMaker.y < 900) {
        troubleMaker.y += 1;
    } else if (troubleMaker.y == 900 && troubleMaker.x < 800) {
        troubleMaker.x += 1;
    }

    if (yourCar.y < 900) {
        yourCar.y += 1;
    } else if (yourCar.y == 900 && yourCar.x < 700) {
        yourCar.x += 1;
    }

});
