class Food {
    constructor(){
    var foodStock = 0;
    var LastFed
    this.image = loadImage("Milk.png");
}

bedroom(){
    background(BedroomImg,500,500);
}

garden(){
    background(GardenImg,500,500);
}

washroom(){
    background(WashroomImg,500,500);
}


getFoodStock(){
   return this.foodStock;
}

updateFoodStock(foodStock){
    this.foodStock = foodStock;


}

getFedTime(LastFed){
    this.LastFed = LastFed;
}

deductFood(){

}


display(){
    
    var x=80, y=100;

    imageMode(CENTER);
    image(this.image, 720,22,70,70);

    if(this.foodStock!=0){
        for(var i=0; i<this.foodStock; i++){
            if(i%10==0){
                x=80;
                y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
        }
    }
}





}