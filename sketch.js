var dogImage, happyDog;
var database;
var foodS, foodStock;
var feedDog, addFood;
var fedTime, LastFed;
var foodObj;
var BedroomImg, GardenImg, WashroomImg;
var gameState, readState;

function preload()
{
  dogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  BedroomImg = loadImage("Bed Room.png");
  GardenImg = loadImage("Garden.png");
  WashroomImg = loadImage("Wash Room.png");
}

function setup() {
  database = firebase.database();

	createCanvas(500, 500);

  dog = createSprite(250,300,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  feed = createButton("feed dog");
  feed.position(580,160);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(650,160);
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

  



  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  foodObj = new Food();
}


function draw() {  
  background(46,139,87);
  foodObj.display();

  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage(happyDog);

  // }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(dogImage);
  }



  currentTime = hour();
  if(currentTime==(LastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(LastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(LastFed+2) && currentTime<=(LastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }

 

  // fill("white");
  // text("foodStock: " + foodS ,200,200);

  // fill("white");
  // text("Press the up arrow key to feed the dog", 150, 50);

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function(data){
    LastFed = data.val();
    console.log("lastfed: "+ LastFed);
  });

  fill(255,255,254);
  textSize(15);
  if(LastFed>=12){
    text("Last Fed: "+ LastFed%12 + "PM", 100,120);
    console.log("Last Fed: "+ LastFed%12);
  }else if(LastFed == 0){
    text("Last Fed: 12 AM", 100,120);
  }else{
    text("Last Fed: " + LastFed + "AM", 100,125);
  }

  

  
  
  drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  
database.ref('/').update({
  Food:x

})
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })

}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  });

}

function update(state){
  database.ref('/').update({
    gameState:state
  });

}



