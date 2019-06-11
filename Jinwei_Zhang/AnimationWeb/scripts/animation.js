PIXI.utils.sayHello();
// app.js should read the data through either json or xml or anydata structure and visualise here.

const app = new PIXI.Application({ backgroundColor: 0xFFFFFF, width: 1200, height: 1000 });
document.getElementById("content").appendChild(app.view);



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
let text1 = new PIXI.Text('Main Street',{fontFamily : 'Arial', fontSize: 24, fill : 0xFFFFFF});
text1.x = 350;
text1.y = 520;
graphics.lineStyle(2, 0xFFFFFF, 1);
graphics.beginFill(0x333);
graphics.drawRect(200, 500, 900, 70);
graphics.endFill();



// create a new Sprite from an image path
const myCar = PIXI.Sprite.from('imgs/myCar.png');


// center the sprite's anchor point
myCar.x = 150;
myCar.y = 340;



app.stage.addChild(graphics);
app.stage.addChild(text1);
app.stage.addChild(myCar);

// Listen for animate update
app.ticker.add((delta) => {

    if (myCar.y <= 600) {
        myCar.x += 1;
    }

});
