var balloon;
var balloonImg;
var bgImg;
var database;
 

function preload(){
balloonImg =loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
bgImg=loadImage("Hot Air Ballon-01.png");

}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
 balloon =  createSprite(400, 200, 50, 50);
 balloon.addAnimation("b",balloonImg);
 balloon.scale=0.5

 var balloonP = database.ref('balloon/height');
 balloonP.on("value",readPosition, showError);
}

function draw() {
  background(bgImg);
 
    if(keyDown(LEFT_ARROW)){
     updateHeight(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      updateHeight(10,0);
    }
    else if(keyDown(UP_ARROW)){
      updateHeight(0,-10);
      balloon.addAnimation("b",balloonImg);
      balloon.scale=balloon.scale-0.01;
    }
    textSize(10);
    fill("black");
    text("use arrow keys to move the hot air balloon",100,20);
    
  drawSprites();
}
function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x+x,
    'y': height.y+y
  })
}

function readPosition(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}

function showError(){
  console.log("error in writing to the database");
}









