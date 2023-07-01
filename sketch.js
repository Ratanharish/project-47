var player_running,player_standing
var thief
var rocks,helicopter,jungle,bullet,pebble
var tiger_sitting,tiger_running
var bridge
var backgroundS
var playButton,rulesB
var gameState=PLAY
var gameState=END
var score=0
var PLAY=1
var END=2
var invisibleG
var player
var reset

function preload(){
 playerRunning= loadImage("assets/running_archeologist.png")
 playerStanding= loadImage("assets/standing_archeologist.png")

 tigerSitting= loadImage("assets/tiger_sitting.png")
 tigerRunning=loadImage("assets/tiger_running.png")

stealer=loadImage("assets/robber.png")
stealer_R=loadAnimation("assets/robber_1.png","assets/robber_2.png","assets/robber_3.png",
"assets/robber_4.png","assets/robber_5.png","assets/robber_6.png")

 bullet=loadImage("assets/bullet.png")

 rocksI=loadImage("assets/rocks.png")
 helicopter=loadImage("assets/helicopter.png")
 backgroundS=loadImage("assets/jungle1.png")
 bridge=loadImage("assets/bridge.png")
 playB=loadImage("assets/play_button.png")
 resetB=loadImage("assets/reset.png")
 pebbleI=loadImage("assets/pebble.png")
 rulesI=loadImage("assets/rules.png")
}


function setup() {
  createCanvas(1400,650);

 background1=createSprite(700,325,2400,650)
 background1.addImage(backgroundS)
 background1.x=background1.width/2

  player=createSprite(600, 600 );
  player.addImage("running",playerRunning)
  player.scale= 0.6

  thief=createSprite(200,450)
  thief.addImage("standing",stealer)
  thief.addAnimation("running",stealer_R)
  thief.scale= 0.45

  playButton=createSprite(1200,120)
  playButton.addImage(playB)
  playButton.scale=0.3
  
rulesButton=createSprite(1200,220)
rulesButton.addImage(rulesI)
rulesButton.scale=0.3

invisibleG=createSprite(500,640,2000,10)
invisibleG.visible = false

 rocksGroup= new Group()
 player.debug= false
 player.setCollider("circle",-100,0,150)

 
}

function draw() {
  
 background(0)
if (gameState== PLAY){
  score=score+Math.round(getFrameRate()/60)
  SpawnRocks()
  

}

  if(mousePressedOver(playButton)){
    thief.changeAnimation("running",stealer_R)
    gameState=PLAY
    background1.velocityX=-3
    playButton.visible=false
    rulesButton.visible=false


  }
  if(background1.x<-1){
    background1.x=background1.width/2

  } 
  if(keyDown("space")){
    player.velocityY=-17
    
  }
  if(keyDown("s")){
    pebble=createSprite(player.position.x,player.position.y)
    pebble.addImage(pebbleI)
    pebble.scale=0.1
    pebble.velocityX=5
  }
  

  if(rocksGroup.isTouching(player)){
     gameState=END
     Gameover()
  
  }
  
  
  

  player.velocityY=player.velocityY+0.8
  player.collide(invisibleG)
 
  drawSprites();
  textSize(50)
  text("Score:"+score,100,120)


}
function SpawnRocks(){
  if (frameCount% 350===0){
    rocks=createSprite(1200,600)
    rocks.addImage(rocksI)
    rocks.scale=0.15
    rocks.velocityX=-9
    rocks.lifetime=800
    
    rocksGroup.add(rocks)
  }
}
function spawnBridge(){
  bridge=createSprite(800,200)
}

function Gameover(){
   swal({
    title: `Game Over`,
    text: "Oh no, you lost the artifact....!!!",
    text:"YOUR SCORE IS:   "+score,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  })
  
   
  background1.velocityX=0
  rocks.velocityX=0

}
