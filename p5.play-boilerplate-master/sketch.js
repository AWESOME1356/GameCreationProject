var knight, enemyGroup;
var ground, invisibleGround;
var trapSquare, weaponBox;
var enemy;
var START=0;
var End=1;
var gameState=START;

function preload(){
  knight_running = loadAnimation("Images/NewKnight3.png", "Images/NewKnight4.png");
  knight_attacking = loadAnimation("Images/NewKnight1.png", "Images/NewKnight2.png");
  enemy_protecting=loadAnimation("Images/EnemySkeleton.png");
  enemy_dying=loadAnimation("Images/DeathCloud.png");
  ground_grounding=loadImage("Images/ground2.png");
  
  
}

function setup() {
  createCanvas(800,400);
  
  knight=createSprite(100, 200, 50, 50);
  enemyGroup = new Group();

  ground=createSprite(400,375,1600,40);
  invisibleGround = createSprite(400,400,1000,40);
  invisibleGround.visible = false;

  knight.addAnimation("running", knight_running);
  knight.addAnimation("attacking", knight_attacking);
  
  ground.addImage("ground2.png", ground_grounding);
}

function draw() {
  background(0); 
 
if(gameState==START){
  AttackToRun();
  Jump();
  GroundAndGravity();
  Rules(); 
  spawnEnemy();

}else if(gameState=END){

}

  drawSprites();
}

function AttackToRun(){
  if(keyDown("space")){
    knight.changeAnimation("attacking", knight_attacking);;
  }
  if(keyWentUp("space")){
    knight.changeAnimation("running", knight_running);;
  }

}
function Jump() {
  if(keyDown("UP_ARROW")){
    ground.velocityX = -5;
    enemy.velocityX = -5;
    knight.velocityY=-14;
  }
}
function GroundAndGravity(){
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
if(knight.animation=="running", knight_running){
  ground.velocityX = -5;
}  
else if(knight.animation=="attacking", knight_attacking){
  ground.velocityX = 0;
}

  knight.velocityY = knight.velocityY + 0.8;
  
  knight.collide(invisibleGround);
  

}
function Rules(){
text("Rules:",645,25);
text("Press Space to Attack", 645, 40);
text("Press Up Arrow Key to Jump", 645, 55);
}
function spawnEnemy() {
 
  if (frameCount % 60 == 0) {
    
    enemy=createSprite(900, 355, 50, 50);
   
    enemyGroup.add(enemy);
   enemy.addAnimation("protecting", enemy_protecting);
    enemy.addAnimation("dying", enemy_dying);
    knight.addAnimation("dying", enemy_dying);

    if(enemyGroup.isTouching(knight) && knight.animation=="attacking"){
     // enemy.changeAnimation("dying", enemy_dying);
     enemy.velocityX=-20;
    }
   
    //enemy.collide(invisibleGround);
    //enemy.velocityY = enemy.velocityY + 0.8;
    enemy.scale=0.5;
    enemy.lifetime = 240;

   if(knight.animation=="running", knight_running){
      enemy.velocityX = -5;
    }
    else if(knight.animation=="attacking", knight_attacking){
      enemy.velocityX = 0;
    }
  knight.debug=true;
 enemy.debug=true;
   /* else if(enemyGroup.isTouching(knight) && knight.animation=="running"){
    knight.changeAnimation("dying", enemy_dying);
   } */
  }
  
  
  
 

  
}
