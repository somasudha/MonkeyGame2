var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;

function preload() {


  monkey_running = loadImage("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400);
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;

  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("white");

  if (ground.x > 0) {
    ground.x = ground.width / 2;
  }
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8

  //score = score + Math.round(getFrameRate()/60);

  if (foodGroup.isTouching(monkey)) {
    score = score + 2;
    foodGroup.destroyEach();
  }

  if (obstacleGroup.isTouching(monkey)) {
    monkey.scale = 0.1;
    obstacleGroup.destroyEach();
  }


  monkey.collide(ground);

  drawSprites();
  createFood();
  createObstacle();
  fill("black");
  textSize(20);
  text("Score: " + score, 230, 50);

}

function createFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(200, Math.round(random(120, 200)), 10, 40);
    banana.velocityX = -4;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 100;
    foodGroup.add(banana);
  }

}

function createObstacle() {
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(300, 330, 10, 40);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }

}