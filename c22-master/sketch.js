var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;
var engine;
var world;
var boxes = [];
var ground;
var gSlider;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    gSlider = createSlider(0, 100, 50);
    gSlider.position(40, 365);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 1);
    var options = {
        isStatic: true
    }
    ground = Bodies.rectangle(200, height - 50, width, 10, options);
    World.add(world, ground);
}

function mousePressed() {
    if (mouseY < 350) {
        boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
    }
}
 
function draw() {
    background("chartreuse");
    var fVal = gSlider.value(); 
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
    noStroke();
    fill("lightGreen");
    strokeWeight(4);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, width, 10);
    fill("red");
    textSize(20);
    text("     Gravity " + fVal, 160, 381);
}

function Box(x, y, w, h, options) {
    var options = {
        friction: 3,
        restitution: 1,
    } 
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(3);
        stroke("grey");
        fill("aqua");
        rect(0, 0, this.w, this.h);
        pop();
    }
}