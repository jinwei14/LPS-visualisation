PIXI.utils.sayHello();


const app = new PIXI.Application({ backgroundColor: 0x1099bb, width: 1200, height: 800 });
document.body.appendChild(app.view);

// const basicText = new PIXI.Text('Basic text in pixi');
// basicText.x = 50;
// basicText.y = 100;
//
// app.stage.addChild(basicText);

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
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


// create a new Sprite from an image path
const myCar = PIXI.Sprite.from('imgs/myCar.png');

// center the sprite's anchor point
myCar.x = 500;
myCar.y = 500;

// move the sprite to the center of the screen
// myCar.x = app.screen.width / 20;
// myCar.y = app.screen.height / 20;

app.stage.addChild(myCar);

// Listen for animate update
app.ticker.add((delta) => {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    // bunny.rotation += 0.1 * delta;
    myCar.x += 2;
    myCar.y += 2;
});
