
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,bananaGroup
var score,ground
var survivalTime = 0

var gameState = PLAY
var PLAY
var END



var backgroundImg

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

 freeze = loadImage("sprite_0.png");
 
  backgroundImg = loadImage("background.png");

}



function setup() {
  createCanvas(displayWidth,displayHeight);
  
  //creating monkey
  monkey = createSprite(80,displayHeight-170,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400,displayHeight-165,900,10);
  ground.velocityX = -4;
  ground.visible = false
  
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;

 
}


function draw() {
background(backgroundImg);
  
  

  
  
  //makes monkey jump
  
  
  //add gravity
 
  
  
  
  if(gameState === PLAY){
    if(ground.x<450){
      ground.x = ground.width/2;
      console.log(ground.x);
    }
    if(keyDown("space")&& monkey.y >=displayHeight-300){
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY+1;

    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score+2;
    }

  food();
  obstacles();

  switch(score){
    case 10: monkey.scale=0.16;
            break;
    case 20: monkey.scale=0.18;
            break;
     case 30: monkey.scale=0.20;
            break;
    case 40: monkey.scale=0.22;
            break;
    case 50: monkey.scale=0.24;
            break;
    default: break;
  }

   
  monkey.collide(ground);

  drawSprites();

  stroke("white");
  textSize(20);
  fill("black");
  text("score:" + score,500,50)

  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("SurvivalTime:" + survivalTime,100,50);
  }
  
  if(obstacleGroup.isTouching(monkey)){
  gameState = END
  stroke("black");
  textSize(40);
  text("Game Over",displayWidth/2,displayHeight/2)
  obstacleGroup.setVelocityXEach(0)
  bananaGroup.setVelocityXEach(0)
  monkey.changeImage(freeze)
  }

}

function food(){
  
  if(frameCount %200 === 0 && camera.position.x !== 220){
  banana = createSprite(displayWidth-30,Math.round(random(displayHeight-300,displayHeight-400)),20,20);
  banana.addImage(bananaImage);
  banana.lifetime = 800;
  banana.velocityX = -4; 
  banana.scale = 0.1 
  bananaGroup.add(banana);
  }
}

function obstacles(){
  
  if(frameCount %300 === 0 && camera.position.x !== 220){
    obstacle = createSprite(displayWidth-30,displayHeight-200,20,20);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 800;
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
  }
  
  
}




