var mario,obstacleImg;
var groundImage, ground,ma,bg;
var PLAY = 1, END = 0;
var gameState = PLAY;
var obstacleGroup;
var score = 2;
var brickImg, animal1Img;

function preload(){
  bg = loadImage("background.JPG");
  ma = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png");
  groundImage = loadImage("ground2.png");
  obstacleImg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  brickImg = loadImage("brick.png");
  animal1Img = loadImage("animal.png");


}



function setup() {
 createCanvas(600,350);
 mario = createSprite(50,250,20,50);
  mario.addAnimation("running",ma);
  ground = createSprite(200,330,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  ground.velocityX = (-2);

obstacleGroup = new Group();
animalsGroup = new Group();
bricksGroup = new Group();
invisibleBlockGroup = new Group();
  
}
function draw() {
  background(bg);
  textSize(20);
  fill(0);
  text("Score:"+score, 480, 30);
  if(gameState === PLAY){
    ground.velocityX = (-2);
   /* if(keyCode(32)&& ma.y>=250){
ma.velocityY = (-12);

    }*/
    ma.velocityY = ma.velocityY+0.5;
    if(obstacleGroup.isTouching(ma)){
      gameState =  END;
    }
  }
  
  



  if(ground.x<0){
    ground.x = ground.width/2;
  }

  spawnObstacles();
  spawnBrick();
  drawSprites();
}
function spawnObstacles(){
  if(frameCount%200 === 0){
  var obstacle = createSprite(600,270,10,40);
  obstacle.velocityX = (-5);
  obstacle.addAnimation("obstacles", obstacleImg);
  obstacle.Lifetime = 300;
  }
}
function spawnBrick(){
  if(frameCount % 240 === 0){
    var brick = createSprite(250,100);
    var animal = createSprite(250,60);
    var invisibleBlock = createSprite(250,100);
    invisibleBlock.width = animal.width;
    invisibleBlock.height = 2;
    
   brick.x = Math.round(random(120,400));
   animal.x =brick.x;
    invisibleBlock.x = brick.x;
    
    animal.addImage(animal1Img);
    animal.scale = 0.5;
  brick.addImage(brickImg);
  brick.scale = 1.5;
    
    animal.velocityX = -1;
    brick.velocityX= -1;
    invisibleBlock.velocityX = -1;
    
    
    
    //assign lifetime to the variable
    animal.lifetime = 450;
    brick.lifetime = 450;
    invisibleBlock.lifetime = 450;

    
    //add each door to the group
    animalsGroup.add(animal);
    invisibleBlock.debug = false;
    bricksGroup.add(brick);
    invisibleBlockGroup.add(invisibleBlock);

  }
}